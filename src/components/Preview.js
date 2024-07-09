import React from 'react';
import jsPDF from 'jspdf';
import { Typography, Grid, Paper, IconButton, Tooltip } from '@mui/material';
import { SaveAlt as SaveAltIcon } from '@mui/icons-material';

function Preview({ formData }) {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFont('helvetica');
        doc.setFontSize(12);
        let yPosition = 20;

        // Add photo if available
        if (formData.photo) {
            const imgProps = doc.getImageProperties(formData.photo);
            const imgWidth = 50;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            doc.addImage(formData.photo, 'JPEG', 20, yPosition, imgWidth, imgHeight);
            yPosition += imgHeight + 10;
        }

        // Add personal information
        doc.text(`Name: ${formData.name}`, 80, yPosition);
        doc.text(`Email: ${formData.email}`, 80, yPosition + 10);
        doc.text(`Phone: ${formData.phone}`, 80, yPosition + 20);
        doc.text(`Address: ${formData.address}`, 80, yPosition + 30);
        yPosition += 50;

        // Add summary
        doc.text('Summary', 20, yPosition);
        doc.text(formData.summary, 20, yPosition + 10);
        yPosition += 30;

        // Add education
        doc.text('Education', 20, yPosition);
        formData.education.forEach((edu, index) => {
            yPosition += 10;
            doc.text(`Institution: ${edu.institution}`, 30, yPosition);
            doc.text(`Degree: ${edu.degree}`, 30, yPosition + 10);
            doc.text(`Years: ${edu.startYear} - ${edu.endYear}`, 30, yPosition + 20);
            yPosition += 20;
        });
        yPosition += 10;

        // Add experience
        doc.text('Experience', 20, yPosition);
        formData.experience.forEach((exp, index) => {
            yPosition += 10;
            doc.text(`Company: ${exp.company}`, 30, yPosition);
            doc.text(`Role: ${exp.role}`, 30, yPosition + 10);
            doc.text(`Years: ${exp.startYear} - ${exp.endYear}`, 30, yPosition + 20);
            yPosition += 20;
        });
        yPosition += 10;

        // Add skills
        doc.text(`Skills: ${formData.skills}`, 20, yPosition);

        // Save the PDF with filename 'resume.pdf'
        doc.save('resume.pdf');
    };

    return (
        <div className="full-page">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Resume Preview
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    {formData.photo && (
                        <Paper elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
                            <img src={formData.photo} alt="Profile" style={{ width: '100%', borderRadius: '50%' }} />
                        </Paper>
                    )}
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Name:</strong> {formData.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Email:</strong> {formData.email}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Phone:</strong> {formData.phone}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Address:</strong> {formData.address}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Summary:</strong> {formData.summary}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Education
                            </Typography>
                            {formData.education.map((edu, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Institution:</strong> {edu.institution}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Degree:</strong> {edu.degree}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Years:</strong> {edu.startYear} - {edu.endYear}
                                    </Typography>
                                </div>
                            ))}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Experience
                            </Typography>
                            {formData.experience.map((exp, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Company:</strong> {exp.company}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Role:</strong> {exp.role}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Years:</strong> {exp.startYear} - {exp.endYear}
                                    </Typography>
                                </div>
                            ))}
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                <strong>Skills:</strong> {formData.skills}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Tooltip title="Export PDF">
                                <IconButton onClick={generatePDF}>
                                    <SaveAltIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Preview;
