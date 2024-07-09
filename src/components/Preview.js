import React from 'react';
import jsPDF from 'jspdf';

function Preview({ formData }) {
    const generatePDF = () => {
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
    };

    return (
        <div>
            <h2>Resume Preview</h2>
            {formData.photo && <img src={formData.photo} alt="Profile" style={{ width: '100px', marginBottom: '10px' }} />}
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Summary:</strong> {formData.summary}</p>
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
                <div key={index}>
                    <p><strong>Institution:</strong> {edu.institution}</p>
                    <p><strong>Degree:</strong> {edu.degree}</p>
                    <p><strong>Years:</strong> {edu.startYear} - {edu.endYear}</p>
                </div>
            ))}
            <h3>Experience</h3>
            {formData.experience.map((exp, index) => (
                <div key={index}>
                    <p><strong>Company:</strong> {exp.company}</p>
                    <p><strong>Role:</strong> {exp.role}</p>
                    <p><strong>Years:</strong> {exp.startYear} - {exp.endYear}</p>
                </div>
            ))}
            <p><strong>Skills:</strong> {formData.skills}</p>
            <button onClick={generatePDF}>Export to PDF</button>
        </div>
    );
}

export default Preview;
