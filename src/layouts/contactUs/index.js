import React from 'react'
import './style.css'

const AccountClosureRequest = () => {
    document.title = "Anaxee Partner App - Account Closure Request";
    return (
      <div className='body'>
      <div className="container">
        <h1>Request Closure of Your Account and Deletion of Your Personal Information</h1>
        <p className='p' style={{marginTop: "20px"}}>You can submit a request for us to permanently close your Anaxee Partner app account and delete your personal information.</p>
  
        <div className="instructions">
          <p className='p' >If you wish to delete your account(s) with Anaxee Partner app, please <a href="mailto:support26@anaxee.com"><strong>contact us</strong></a> with the following information to enable us to action your request as efficiently as possible:</p>
          <ul>
            <li>The email and phone number of which you want to delete the data.</li>
            <li>If you have more than one account you wish to be deleted, please list all the relevant information.</li>
            <li>If your account is with a different email address from the one you are contacting us from, please provide us with the email address and the phone number by which your account is registered with and your association with that email address.</li>
          </ul>
        </div>
  
        <p className="note"><strong>Note:</strong> Once your account is deleted, it is no longer accessible by you or anyone else, and it cannot be restored. If you decide later that you want to start working for Anaxee again or if you would like any opportunity that Anaxee provides which requires an account, you'll need to create a new account.</p>
  
        <div className="confirmation">
          <p>A confirmation notification will be sent to the email address associated with your account or via text message. You’ll need to reply within 5 days to verify your request.</p>
        </div>
      </div>
      </div>
    );
  }
  
  export default AccountClosureRequest;