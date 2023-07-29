import Head from 'next/head';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import TextInput from '../components/TextInput';
import SubmitButton from '../components/SubmitButton';
import ResponseDisplay from '../components/ResponseDisplay';
import DropdownSelect from '../components/DropdownSelect';
import { getUserPrompt } from '../prompts/promptUtils';
import useApi from '../hooks/useApi';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const { data, error, loading } = useApi('/api/openai', 'POST', { subject, question });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitValue(getUserPrompt(subject, question));
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Study Buddy</title>
        <meta name="description" content="AI-powered education app for academic assistance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style jsx global>{`
          body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
          }
        `}</style>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
            background-color: #ffffff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .header {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #1a73e8;
          }

          .description {
            font-size: 1.1rem;
            max-width: 500px;
            text-align: center;
            margin-bottom: 2rem;
            color: #666;
          }

          .form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 400px;
          }

          .form-input {
            width: 100%;
            margin-bottom: 1rem;
            padding: 0.5rem;
            border: 2px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            outline: none;
          }

          .select {
            width: 100%;
            margin-bottom: 1rem;
            padding: 0.5rem;
            border: 2px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            outline: none;
            appearance: none;
            background: url('/dropdown-arrow.svg') no-repeat right 0.75rem center;
            background-size: 12px;
          }

          .submit-btn {
            background-color: #1a73e8;
            color: #fff;
            border: none;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .submit-btn:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .submit-btn:hover {
            background-color: #0d47a1;
          }
        `}</style>
      </Head>
      <main className="container">
        <h1 className={`header ${inter.className}`}>Study Buddy</h1>
        <p className={`description ${inter.className}`}>
          Get step-by-step answers to your academic questions across various subjects.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <ResponseDisplay data={data} error={error} loading={loading} />
          <DropdownSelect
            className={`select ${inter.className}`}
            value={subject}
            onChange={handleSubjectChange}
            options={['Math', 'Science', 'Languages', 'Literature', 'History']}
            placeholder="Select a subject"
          />
          <TextInput
            className={`form-input ${inter.className}`}
            value={question}
            onChange={handleQuestionChange}
            placeholder="Ask a question"
          />
          <SubmitButton
            className={`submit-btn ${inter.className}`}
            onClick={handleSubmit}
            disabled={loading}
          />
        </form>
      </main>
    </>
  );
}
