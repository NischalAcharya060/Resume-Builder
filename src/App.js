import React, { useState } from 'react';
import Form from './components/Form';
import Preview from './components/Preview';
import jsPDF from 'jspdf';
import {
    Container,
    CssBaseline,
    Typography,
    Paper,
    Grid,
    Divider,
    Button,
    Box,
    Snackbar,
    IconButton,
} from '@mui/material';
import { SaveAlt as SaveAltIcon, Close as CloseIcon } from '@mui/icons-material';
import './App.css';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        summary: '',
        education: [{ institution: '', degree: '', startYear: '', endYear: '' }],
        experience: [{ company: '', role: '', startYear: '', endYear: '' }],
        skills: '',
        photo: null,
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const saveToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        let yPosition = 10;

        if (formData.photo) {
            const imgProps = doc.getImageProperties(formData.photo);
            const imgWidth = 50;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            doc.addImage(formData.photo, 'JPEG', 10, yPosition, imgWidth, imgHeight);
            yPosition += imgHeight + 10;
        }

        doc.text(`Name: ${formData.name}`, 10, yPosition);
        doc.text(`Email: ${formData.email}`, 10, yPosition + 10);
        doc.text(`Phone: ${formData.phone}`, 10, yPosition + 20);
        doc.text(`Address: ${formData.address}`, 10, yPosition + 30);
        doc.text(`Summary: ${formData.summary}`, 10, yPosition + 40);

        yPosition += 50;

        doc.text('Education:', 10, yPosition);
        formData.education.forEach((edu, index) => {
            yPosition += 10;
            doc.text(`Institution: ${edu.institution}`, 10, yPosition);
            doc.text(`Degree: ${edu.degree}`, 10, yPosition + 10);
            doc.text(`Years: ${edu.startYear} - ${edu.endYear}`, 10, yPosition + 20);
            yPosition += 20;
        });

        yPosition += 10;

        doc.text('Experience:', 10, yPosition);
        formData.experience.forEach((exp, index) => {
            yPosition += 10;
            doc.text(`Company: ${exp.company}`, 10, yPosition);
            doc.text(`Role: ${exp.role}`, 10, yPosition + 10);
            doc.text(`Years: ${exp.startYear} - ${exp.endYear}`, 10, yPosition + 20);
            yPosition += 20;
        });

        yPosition += 10;

        doc.text(`Skills: ${formData.skills}`, 10, yPosition);

        doc.save('resume.pdf');

        setSnackbarOpen(true);
    };

    return (
        <div className="App">
            <CssBaseline />

            <Container maxWidth="lg">
                <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Resume Builder
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Form formData={formData} setFormData={setFormData} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Preview formData={formData} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="center" mt={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveAltIcon />}
                                    onClick={saveToPDF}
                                >
                                    Export to PDF
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="PDF Exported successfully!"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    );
}

export default App;
