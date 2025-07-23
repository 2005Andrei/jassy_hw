// Generate packet content
export const generatePacketContent = (type) => {
  const contents = {
    HTTP: [
      'GET /index.html HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla/5.0',
      'POST /login HTTP/1.1\nHost: example.com\nContent-Type: application/x-www-form-urlencoded\n\nusername=admin&password=pass123',
      'HTTP/1.1 200 OK\nContent-Type: text/html\n\n<!DOCTYPE html><html>...</html>'
    ],
    FTP: [
      'USER anonymous\nPASS guest@example.com\nPORT 192,168,1,2,14,178\nRETR data.txt',
      '220 FTP Server ready\n331 Password required\n230 User logged in'
    ],
    DNS: [
      'Standard query 0x53a1 A example.com\nAnswer: example.com 3600 IN A 93.184.216.34',
      'Standard query 0x8d2f AAAA google.com\nAnswer: google.com 300 IN AAAA 2a00:1450:4009:816::200e'
    ],
    SSH: [
      'SSH-2.0-OpenSSH_7.6p1\nDiffie-Hellman key exchange\nAES-256-CTR encryption',
      'SSH_MSG_USERAUTH_REQUEST\nUsername: root\nPassword: ********'
    ]
  };
  return contents[type][Math.floor(Math.random() * contents[type].length)];
};
// Protocol-specific colors
export const protocolColors = {
  HTTP: '#268bd2',
  FTP: '#f7ca18',
  DNS: '#2ecc71',
  SSH: '#bb9af7'
};