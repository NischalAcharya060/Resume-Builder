import React from 'react';

function Form({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, photo: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleEducationChange = (index, e) => {
        const updatedEducation = formData.education.map((edu, i) =>
            i === index ? { ...edu, [e.target.name]: e.target.value } : edu
        );
        setFormData({ ...formData, education: updatedEducation });
    };

    const handleExperienceChange = (index, e) => {
        const updatedExperience = formData.experience.map((exp, i) =>
            i === index ? { ...exp, [e.target.name]: e.target.value } : exp
        );
        setFormData({ ...formData, experience: updatedExperience });
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { institution: '', degree: '', startYear: '', endYear: '' }],
        });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { company: '', role: '', startYear: '', endYear: '' }],
        });
    };

    return (
        <form>
            <div>
                <label>Photo:</label>
                <input type="file" onChange={handleFileChange} />
            </div>
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
            <div>
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div>
                <label>Summary:</label>
                <textarea name="summary" value={formData.summary} onChange={handleChange} />
            </div>
            <div>
                <h3>Education</h3>
                {formData.education.map((edu, index) => (
                    <div key={index}>
                        <label>Institution:</label>
                        <input type="text" name="institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} />
                        <label>Degree:</label>
                        <input type="text" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} />
                        <label>Start Year:</label>
                        <input type="text" name="startYear" value={edu.startYear} onChange={(e) => handleEducationChange(index, e)} />
                        <label>End Year:</label>
                        <input type="text" name="endYear" value={edu.endYear} onChange={(e) => handleEducationChange(index, e)} />
                    </div>
                ))}
                <button type="button" onClick={addEducation}>Add Education</button>
            </div>
            <div>
                <h3>Experience</h3>
                {formData.experience.map((exp, index) => (
                    <div key={index}>
                        <label>Company:</label>
                        <input type="text" name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
                        <label>Role:</label>
                        <input type="text" name="role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} />
                        <label>Start Year:</label>
                        <input type="text" name="startYear" value={exp.startYear} onChange={(e) => handleExperienceChange(index, e)} />
                        <label>End Year:</label>
                        <input type="text" name="endYear" value={exp.endYear} onChange={(e) => handleExperienceChange(index, e)} />
                    </div>
                ))}
                <button type="button" onClick={addExperience}>Add Experience</button>
            </div>
            <div>
                <label>Skills:</label>
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} />
            </div>
        </form>
    );
}

export default Form;
