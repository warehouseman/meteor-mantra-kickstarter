export default {

  coords(Logger) {
    let parm = {};
    parm.file = Logger.f || null;
    parm.action = Logger.a || null;
//    parm.level = Logger.l || null;

    parm.ip = Meteor.isServer ?
                '127.0.0.1' :
                Logger.myIp || null;
    return parm;
  }

};
