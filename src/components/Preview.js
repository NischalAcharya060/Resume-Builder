import React from 'react';

function Preview({ formData }) {
    return (
        <div>
            <h2>Resume Preview</h2>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
        </div>
    );
}

export default Preview;
