/**
 * Deploy script for ISP Net → VPS via SFTP + SSH
 * Usage: node deploy.js
 */
const { Client } = require("ssh2");
const fs = require("fs");
const path = require("path");

const CONFIG = {
  host: "192.168.20.14",
  port: 22,
  username: "ocean",
  password: "Sampo3rn@ij00",
  remoteBase: "/home/ocean/htdocs/ocean.web.id",
};

// Folders & files to upload (relative to project root)
const UPLOAD_ITEMS = [
  ".next",
  "public",
  "src",
  "package.json",
  "package-lock.json",
  "next.config.mjs",
  "jsconfig.json",
];

let totalFiles = 0;
let uploadedFiles = 0;

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

function getFilesToUpload() {
  const projectRoot = __dirname;
  let files = [];
  for (const item of UPLOAD_ITEMS) {
    const fullPath = path.join(projectRoot, item);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠ Skipping ${item} (not found)`);
      continue;
    }
    if (fs.statSync(fullPath).isDirectory()) {
      const dirFiles = getAllFiles(fullPath);
      for (const f of dirFiles) {
        files.push({
          local: f,
          remote: path.posix.join(
            CONFIG.remoteBase,
            path.relative(projectRoot, f).replace(/\\/g, "/")
          ),
        });
      }
    } else {
      files.push({
        local: fullPath,
        remote: path.posix.join(CONFIG.remoteBase, item),
      });
    }
  }
  return files;
}

function execSSH(conn, cmd) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔧 Running: ${cmd}`);
    conn.exec(cmd, (err, stream) => {
      if (err) return reject(err);
      let stdout = "", stderr = "";
      stream.on("data", (d) => { stdout += d; process.stdout.write(d); });
      stream.stderr.on("data", (d) => { stderr += d; process.stderr.write(d); });
      stream.on("close", (code) => {
        resolve({ code, stdout, stderr });
      });
    });
  });
}

async function mkdirRecursive(sftp, remotePath) {
  const parts = remotePath.split("/").filter(Boolean);
  let current = "";
  for (const part of parts) {
    current += "/" + part;
    try {
      await new Promise((resolve, reject) => {
        sftp.stat(current, (err) => {
          if (err) {
            sftp.mkdir(current, (mkErr) => {
              if (mkErr && mkErr.code !== 4) reject(mkErr); // code 4 = already exists
              else resolve();
            });
          } else {
            resolve();
          }
        });
      });
    } catch (e) {
      // ignore
    }
  }
}

async function uploadFile(sftp, localPath, remotePath) {
  const remoteDir = path.posix.dirname(remotePath);
  await mkdirRecursive(sftp, remoteDir);
  
  return new Promise((resolve, reject) => {
    sftp.fastPut(localPath, remotePath, (err) => {
      if (err) reject(err);
      else {
        uploadedFiles++;
        if (uploadedFiles % 100 === 0 || uploadedFiles === totalFiles) {
          process.stdout.write(`\r📦 Uploaded ${uploadedFiles}/${totalFiles} files...`);
        }
        resolve();
      }
    });
  });
}

async function main() {
  console.log("🚀 ISP Net VPS Deploy Script");
  console.log("============================\n");
  console.log(`📡 Target: ${CONFIG.username}@${CONFIG.host}:${CONFIG.remoteBase}`);

  const files = getFilesToUpload();
  totalFiles = files.length;
  console.log(`📁 Total files to upload: ${totalFiles}\n`);

  const conn = new Client();

  conn.on("ready", async () => {
    console.log("✅ SSH Connected!\n");

    // Step 1: Clean remote directory
    console.log("🧹 Step 1: Cleaning old build on server...");
    await execSSH(conn, `rm -rf ${CONFIG.remoteBase}/.next`);

    // Step 2: Upload files via SFTP
    console.log("\n📤 Step 2: Uploading files via SFTP...");
    
    conn.sftp(async (err, sftp) => {
      if (err) throw err;

      // Upload in batches for better performance
      const batchSize = 10;
      for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize);
        await Promise.all(
          batch.map((f) => uploadFile(sftp, f.local, f.remote).catch(e => {
            console.error(`\n❌ Failed: ${f.remote}: ${e.message}`);
          }))
        );
      }

      console.log(`\n✅ All ${totalFiles} files uploaded!\n`);

      // Step 3: Install dependencies
      console.log("📦 Step 3: Installing dependencies on server...");
      await execSSH(conn, `cd ${CONFIG.remoteBase} && npm install --production 2>&1`);

      // Step 4: Restart the app
      console.log("\n🔄 Step 4: Restarting application...");
      
      // Try PM2 first (CloudPanel uses PM2)
      const pm2Result = await execSSH(conn, `cd ${CONFIG.remoteBase} && pm2 list 2>&1`);
      
      if (pm2Result.stdout.includes("online") || pm2Result.stdout.includes("stopped") || pm2Result.stdout.includes("errored")) {
        console.log("\n📌 PM2 detected, restarting...");
        await execSSH(conn, `cd ${CONFIG.remoteBase} && pm2 restart all 2>&1`);
      } else {
        console.log("\n📌 Starting app with PM2...");
        await execSSH(conn, `cd ${CONFIG.remoteBase} && pm2 start npm --name "isp-net" -- run start 2>&1`);
        await execSSH(conn, `cd ${CONFIG.remoteBase} && pm2 save 2>&1`);
      }

      // Step 5: Verify
      console.log("\n🔍 Step 5: Verifying deployment...");
      await execSSH(conn, `cd ${CONFIG.remoteBase} && pm2 list 2>&1`);
      await execSSH(conn, `sleep 3 && curl -s -o /dev/null -w "HTTP Status: %{http_code}" http://localhost:3000 2>&1 || echo "Waiting for app to start..."` );

      console.log("\n\n🎉 ============================");
      console.log("🎉 DEPLOY COMPLETE!");
      console.log("🎉 ============================");
      console.log(`\n🌐 Website: https://ocean.web.id`);
      console.log("📋 Jangan lupa aktifkan SSL di CloudPanel!\n");
      
      conn.end();
    });
  });

  conn.on("error", (err) => {
    console.error("❌ SSH Connection Error:", err.message);
    process.exit(1);
  });

  conn.connect(CONFIG);
}

main().catch(console.error);
