import React from 'react';

function Form({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                <label>Phone:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
        </form>
    );
}

export default Form;
