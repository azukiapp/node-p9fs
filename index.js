var forever = require('forever-monitor');
var path    = require('path');
var fs      = require('fs');

var arch  = process.platform == 'darwin' ? 'universal' : process.arch ;
var plat  = process.platform;
var spfs  = path.join(__dirname, "vendor", "spfs", plat, arch, "bin", "spfs");

if (!fs.existsSync(spfs)) {
  throw new Error('Plataform not supported or not installed');
}

var child = null;

function start(port, ip) {
  if (!child) {
    child = forever.start([spfs, "-s", "-p", port], {
      max : 5,
      silent : false,
      env: { 'SPFS_IP': ip || '127.0.0.1' }
    });
  }

  return child
}


if (require.main === module) {
  start(5641);
  child.on('start', function() {
    console.log("spfs started in 5641");
  });
} else {
  module.exports = start;
}
