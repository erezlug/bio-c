import React from 'react';

const ContactInfo = () => {
    return (
        <div className="location-area pt-100 pb-70">
            <div className="container">
                <div className="row location-wrap">
                    <div className="col-sm-6 col-lg-4">
                        <div className="location-item">
                        <i className="fas fa-search-location"></i>
                            <h3>Location</h3>
                            <p>Hadassah Medical Center, Jerusalem, Israel.</p>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-4">
                        <div className="location-item">
                        <i className="fas fa-envelope-open-text"></i>
                            <h3>Email</h3>
                            <p>hello@disin.com</p>
                            <p>emailexample@name.com</p>
                        </div>
                    </div>

                    <div className="col-sm-6 offset-sm-3 offset-lg-0 col-lg-4">
                        <div className="location-item">
                        <i className="fas fa-phone"></i>
                            <h3>Phone</h3>
                            <p>+07 5554 3332 322</p>
                            <p>+07 5554 3332 322</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo;