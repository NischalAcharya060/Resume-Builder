import React from 'react';
import jsPDF from 'jspdf';

function Preview({ formData }) {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        doc.text(`Name: ${formData.name}`, 10, 10);
        doc.text(`Email: ${formData.email}`, 10, 20);
        doc.text(`Phone: ${formData.phone}`, 10, 30);
        doc.text(`Address: ${formData.address}`, 10, 40);
        doc.text(`Summary: ${formData.summary}`, 10, 50);

        doc.text('Education:', 10, 60);
        formData.education.forEach((edu, index) => {
            doc.text(`Institution: ${edu.institution}`, 10, 70 + index * 20);
            doc.text(`Degree: ${edu.degree}`, 10, 80 + index * 20);
            doc.text(`Years: ${edu.startYear} - ${edu.endYear}`, 10, 90 + index * 20);
        });

        doc.text('Experience:', 10, 100 + formData.education.length * 20);
        formData.experience.forEach((exp, index) => {
            doc.text(`Company: ${exp.company}`, 10, 110 + formData.education.length * 20 + index * 20);
            doc.text(`Role: ${exp.role}`, 10, 120 + formData.education.length * 20 + index * 20);
            doc.text(`Years: ${exp.startYear} - ${exp.endYear}`, 10, 130 + formData.education.length * 20 + index * 20);
        });

        doc.text(`Skills: ${formData.skills}`, 10, 140 + formData.education.length * 20 + formData.experience.length * 20);

        doc.save('resume.pdf');
    };

    return (
        <div>
            <h2>Resume Preview</h2>
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
