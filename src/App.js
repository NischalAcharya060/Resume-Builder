import React, { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Preview from './components/Preview';
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
    });

    return (
        <div className="App">
            <Header />
            <Form formData={formData} setFormData={setFormData} />
            <Preview formData={formData} />
        </div>
    );
}

export default App;
