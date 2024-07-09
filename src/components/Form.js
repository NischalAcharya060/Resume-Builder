import React from 'react';
import { TextField, Button, Grid, Typography, IconButton, Paper, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
        <div className="full-page">
            <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }}>
                <form noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Personal Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" component="label">
                                Upload Photo
                                <input type="file" hidden onChange={handleFileChange} />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="name" label="Name" fullWidth value={formData.name} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="email" label="Email" fullWidth value={formData.email} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="phone" label="Phone" fullWidth value={formData.phone} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="address" label="Address" fullWidth value={formData.address} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="summary"
                                label="Summary"
                                multiline
                                rows={4}
                                fullWidth
                                value={formData.summary}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                            <Typography variant="h6" gutterBottom>
                                Education
                            </Typography>
                        </Grid>
                        {formData.education.map((edu, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="institution"
                                        label="Institution"
                                        fullWidth
                                        value={edu.institution}
                                        onChange={(e) => handleEducationChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="degree"
                                        label="Degree"
                                        fullWidth
                                        value={edu.degree}
                                        onChange={(e) => handleEducationChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="startYear"
                                        label="Start Year"
                                        fullWidth
                                        value={edu.startYear}
                                        onChange={(e) => handleEducationChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="endYear"
                                        label="End Year"
                                        fullWidth
                                        value={edu.endYear}
                                        onChange={(e) => handleEducationChange(index, e)}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <IconButton onClick={addEducation} color="primary">
                                <AddIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                            <Typography variant="h6" gutterBottom>
                                Experience
                            </Typography>
                        </Grid>
                        {formData.experience.map((exp, index) => (
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="company"
                                        label="Company"
                                        fullWidth
                                        value={exp.company}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="role"
                                        label="Role"
                                        fullWidth
                                        value={exp.role}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="startYear"
                                        label="Start Year"
                                        fullWidth
                                        value={exp.startYear}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="endYear"
                                        label="End Year"
                                        fullWidth
                                        value={exp.endYear}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <IconButton onClick={addExperience} color="primary">
                                <AddIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                            <Typography variant="h6" gutterBottom>
                                Skills
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="skills" label="Skills" fullWidth value={formData.skills} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}

export default Form;
