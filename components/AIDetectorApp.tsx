import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Textarea } from '@mui/material';
import { Trash2, Download, FileText, History, ChevronDown } from 'lucide-react';
import { jsPDF } from 'jspdf';

const AIDetectorApp = () => {
    const [text, setText] = useState('');
    const [analysis, setAnalysis] = useState({ score: 0, breakdown: {}, suggestions: [] });
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedHistory = localStorage.getItem('analysisHistory');
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    const analyzeText = (text) => {
        // Implementing the analyzeTextImproved function logic here.
        // Simulated analysis...
        return { score: Math.random() * 100, breakdown: { factor1: 50, factor2: 30 }, suggestions: ['Add more examples', 'Clarify your points'] };
    };

    const handleAnalyze = () => {
        setIsLoading(true);
        setError('');
        if (text.split(' ').length > 5000) {
            setError('Word count exceeds 5000 words.');
            setIsLoading(false);
            return;
        }
        const result = analyzeText(text);
        setAnalysis(result);
        updateHistory(result);
        setIsLoading(false);
    };

    const updateHistory = (result) => {
        const newHistory = [...history, result];
        setHistory(newHistory);
        localStorage.setItem('analysisHistory', JSON.stringify(newHistory));
    };

    const clearAll = () => {
        setText('');
        setAnalysis({ score: 0, breakdown: {}, suggestions: [] });
        setHistory([]);
        localStorage.removeItem('analysisHistory');
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Analysis Report', 10, 10);
        doc.text(`Score: ${analysis.score}`, 10, 20);
        doc.save('analysis_report.pdf');
    };

    const exportWord = () => {
        // Implement the logic for exporting the document in Word format.
    };

    return (
        <div style={{ background: 'linear-gradient(to right, #f0f0f0, #e0e0e0)', padding: '20px' }}>
            <Card>
                <CardContent>
                    <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to analyze..."
                        rows={4}
                    />
                    <Button onClick={handleAnalyze} disabled={isLoading}>Analyze</Button>
                    {isLoading && <p>Loading...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div>
                        <h3>Analysis Result</h3>
                        <p>Score: {analysis.score}</p>
                        <div>
                            {Object.entries(analysis.breakdown).map(([factor, value]) => (
                                <div key={factor}>
                                    <p>{factor}: {value}</p>
                                    <div style={{ width: '100%', backgroundColor: '#bbb' }}>
                                        <div style={{ width: `${value}%`, backgroundColor: '#4caf50' }}>
                                            {value}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h4>Suggestions:</h4>
                        <ul>
                            {analysis.suggestions.map((suggestion, index) => <li key={index}>{suggestion}</li>)}
                        </ul>
                    </div>
                    <div>
                        <Button onClick={exportPDF}>Export PDF</Button>
                        <Button onClick={exportWord}>Export Word</Button>
                        <Button onClick={clearAll}>Clear All <Trash2 /></Button>
                    </div>
                </CardContent>
            </Card>
            <div>
                <h3>History <ChevronDown /></h3>
                {history.map((item, index) => (
                    <div key={index}>
                        <p>Score: {item.score}</p>
                        {/* Render other history items here, expandable logic can be added */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AIDetectorApp;