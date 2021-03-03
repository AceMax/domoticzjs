/**
 * Node.js module for access to Domoticz API
 * Author: Max Lindqvist 2021
 */

const fs    = require('fs');
const fetch = require(__dirname + '/../node_modules/node-fetch');
const conf  = JSON.parse(fs.readFileSync(__dirname + '/../conf/config.json'));

const domoticzUser = new Buffer.from(conf.domoticz.userName);
const domoticzPass = new Buffer.from(conf.domoticz.password);


/**
 * @param {int} idx    Domoticz device ID.
 * @param {int} nValue Domoticz udevice nvalue
 * @param {int} sValue Domoticz udevice svalue
 */
async function updateUdevice(idx, nValue = 0, sValue = 0) {
  let type   = 'command';
  let param  = 'udevice';

  let res = await fetch(conf.domoticz.apiHost + '/json.htm'
                         + '?username=' + domoticzUser.toString('base64')
                         + '&password=' + domoticzPass.toString('base64')
                         + '&type='     + type
                         + '&param='    + param
                         + '&idx='      + idx
                         + '&nvalue='   + nValue
                         + '&svalue='   + sValue
                       );
  let result = await res.json();

  if (result.status == "OK") {
    return true;
  } else {
    return false;
  }
}

exports.updateUdevice = updateUdevice;
