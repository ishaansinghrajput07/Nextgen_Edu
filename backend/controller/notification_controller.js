import Notification from "../models/notification.model.js";


// ======================================================
// CREATE NOTIFICATION
// Reusable Function
// ======================================================

export const createNotification = async ({
  title,
  message,

  receiver,

  receiverModel = "Auth",

  type = "System",

  icon = "Bell",

  link = "",

  createdBy = null,
}) => {
  try {

    if (!title || !message || !receiver) {
      throw new Error(
        "Title, message and receiver are required"
      );
    }


    const notification = await Notification.create({

      title,

      message,

      receiver,

      receiverModel,

      type,

      icon,

      link,

      createdBy,

      isRead:false,

    });


    return notification;


  } catch(error){

    console.log(
      "CREATE NOTIFICATION ERROR:",
      error.message
    );

    return null;

  }
};




// ======================================================
// MULTIPLE NOTIFICATIONS
// ======================================================

export const createMultipleNotifications = async({

title,

message,

receivers=[],

receiverModel="Auth",

type="System",

icon="Bell",

link="",

createdBy=null,

})=>{


try{


if(!receivers.length)
return [];


const data = receivers.map((receiver)=>({

title,

message,

receiver,

receiverModel,

type,

icon,

link,

createdBy,

isRead:false,

}));


return await Notification.insertMany(data);



}catch(error){


console.log(
"MULTIPLE NOTIFICATION ERROR:",
error.message
);


return [];

}

};




// ======================================================
// SEND NOTIFICATION
// ======================================================

export const sendNotification = async(data)=>{


try{

return await createNotification(data);


}catch(error){

console.log(
"SEND NOTIFICATION ERROR:",
error.message
);


return null;

}

};




// ======================================================
// ADMIN NOTIFICATION
// ======================================================

export const sendAdminNotification = async({

adminId,

title,

message,

type="System",

link="",

createdBy=null,

})=>{


return await sendNotification({

title,

message,

receiver:adminId,

receiverModel:"Auth",

type,

icon:"ShieldCheck",

link,

createdBy,

});


};





// ======================================================
// COUNSELLOR NOTIFICATION
// ======================================================


export const sendCounsellorNotification = async({

counsellorId,

title,

message,

type="System",

link="",

createdBy=null,

})=>{


return await sendNotification({

title,

message,

receiver:counsellorId,

receiverModel:"Counsellor",

type,

icon:"Users",

link,

createdBy,

});


};




// ======================================================
// GET MY NOTIFICATIONS
// ======================================================

export const getMyNotifications = async(req,res)=>{

try{


const notifications =
await Notification.find({

receiver:req.user._id,

})

.sort({

createdAt:-1

})
.limit(50);



return res.status(200).json({

success:true,

count:notifications.length,

notifications,

});



}catch(error){


console.log(
"GET NOTIFICATIONS ERROR:",
error
);


return res.status(500).json({

success:false,

message:"Server Error",

});


}

};




// ======================================================
// MARK SINGLE READ
// ======================================================


export const markNotificationAsRead = async(req,res)=>{

try{


const notification =
await Notification.findOne({

_id:req.params.id,

receiver:req.user._id,

});



if(!notification){

return res.status(404).json({

success:false,

message:"Notification not found"

});

}



notification.isRead=true;

notification.readAt=new Date();


await notification.save();



return res.status(200).json({

success:true,

message:"Notification read",

notification,

});



}catch(error){


console.log(
"READ NOTIFICATION ERROR:",
error
);


return res.status(500).json({

success:false,

message:"Server Error"

});


}

};




// ======================================================
// MARK ALL READ
// ======================================================


export const markAllNotificationsAsRead = async(req,res)=>{

try{


await Notification.updateMany(

{

receiver:req.user._id,

isRead:false,

},

{

$set:{

isRead:true,

readAt:new Date(),

}

}

);



return res.status(200).json({

success:true,

message:"All notifications read",

});



}catch(error){


return res.status(500).json({

success:false,

message:"Server Error"

});


}

};




// ======================================================
// UNREAD COUNT
// ======================================================


export const getUnreadNotificationCount = async(req,res)=>{

try{


const count =
await Notification.countDocuments({

receiver:req.user._id,

isRead:false,

});



return res.status(200).json({

success:true,

count,

});



}catch(error){


return res.status(500).json({

success:false,

message:"Server Error"

});

}


};




// ======================================================
// DELETE SINGLE
// ======================================================


export const deleteNotification = async(req,res)=>{

try{


const notification =
await Notification.findOne({

_id:req.params.id,

receiver:req.user._id,

});



if(!notification){

return res.status(404).json({

success:false,

message:"Notification not found"

});

}



await notification.deleteOne();



return res.status(200).json({

success:true,

message:"Notification deleted"

});



}catch(error){


return res.status(500).json({

success:false,

message:"Server Error"

});


}

};




// ======================================================
// DELETE ALL
// ======================================================


export const deleteAllNotifications = async(req,res)=>{

try{


await Notification.deleteMany({

receiver:req.user._id,

});



return res.status(200).json({

success:true,

message:"All notifications deleted"

});


}catch(error){


return res.status(500).json({

success:false,

message:"Server Error"

});


}

};




// ======================================================
// DELETE READ ONLY
// ======================================================


export const deleteReadNotifications = async(req,res)=>{

try{


const result =
await Notification.deleteMany({

receiver:req.user._id,

isRead:true,

});



return res.status(200).json({

success:true,

message:"Read notifications deleted",

deletedCount:
result.deletedCount,

});


}catch(error){


return res.status(500).json({

success:false,

message:"Server Error"

});


}

};