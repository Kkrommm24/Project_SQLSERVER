const { exec } = require('child_process');
const path = require('path');
const { username, password, database, host } = require('../src/config/config.json').development;

// Đường dẫn tới thư mục chứa file mysqldump.exe
const mysqldumpPath = 'C:\\xampp\\mysql\\bin\\mysqldump.exe';

// Đường dẫn đến tệp sao lưu, bạn có thể thay đổi tùy ý
const backupPath = path.join(__dirname, '..', 'backup', 'backup.sql');

// Tạo câu lệnh để thực hiện backup
const command = `"${mysqldumpPath}" --user=${username} --password=${password} --host=${host} ${database} > "${backupPath}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('Backup failed:', error.message);
    return;
  }
  console.log('Backup successful');
});
