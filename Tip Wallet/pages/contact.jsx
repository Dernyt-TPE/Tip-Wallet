import cStyles from  '../styles/Contact.module.css'
import React, { useEffect, useState } from "react";


export default function Contact() {
    return <>
     <form action="#">
    <div className={cStyles.body}>
       
    <div className={cStyles.card}>
  <h2>Contact Us</h2>
  <div className={cStyles.row}>
    <div className={cStyles.col}>
      <div className={cStyles.form_group}>
        <label>First Name</label>
        <input type="text"/>
      </div>
    </div>

    <div className={cStyles.col}>
      <div className={cStyles.form_group}>
        <label>Surname</label>
        <input type="text"/>
      </div>
    </div>

    <div className={cStyles.col}>
      <div className={cStyles.form_group}>
        <label>Email</label>
        <input type="text"/>
      </div>
    </div>

    <div className={cStyles.col}>
      <div className={cStyles.form_group}>
        <label>Phone</label>
        <input type="text"/>
      </div>
    </div>

    <div className={cStyles.col}>
      <div className={cStyles.form_group}>
        <label>Message</label>
        <textarea></textarea>
      </div>
    </div>

    <div className={cStyles.col}>
      <input type="submit" value="Submit" onClick={function(){alert("Form Submitted ✔ We'll get in touch soon.. 🙂");
}}/>
    </div>
  </div>
</div>
</div>
</form>

    </>
  }
  

//   import React, { useState } from "react";

// const FeedbackForm = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [feedback, setFeedback] = useState("");
  
//     const handleSubmit = (event) => {
//       event.preventDefault();
//       console.log({ name, email, feedback });
//       // you can add your logic here to send the feedback to your backend
//     };
  
//     return (
//       <div style={{ marginTop:"200px"}}>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <label style={{  marginBottom: "10px" }}>
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//             style={{ marginLeft: "10px", padding: "5px" }}
//             required
//           />
//         </label>
//         <label style={{ marginBottom: "10px" }}>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//             style={{ marginLeft: "10px", padding: "5px" }}
//             required
//           />
//         </label>
//         <label style={{ marginBottom: "10px" }}>
//           Feedback:
//           <textarea
//             value={feedback}
//             onChange={(event) => setFeedback(event.target.value)}
//             style={{ marginLeft: "10px", padding: "5px" }}
//             required
//           ></textarea>
//         </label>
//         <button type="submit" style={{ padding: "5px 10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px" }}>Submit</button>
//       </form>
//       </div>
//     );
//   };
  
//   export default FeedbackForm;