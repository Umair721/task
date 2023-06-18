const nodemailer = require("nodemailer");
exports.sendEmail = async (name, email, password) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your Random Password',
    html: `Hy <strong>${name}</strong> Welcome!!<br><br>Your random password is: <strong>${password}</strong>`,
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

