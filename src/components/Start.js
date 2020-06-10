import React, { useState } from 'react';

import ProjectStart from './ProjectStart';
import AddTask from './AddTask';
import Overview from './Overview';

const Start = () => {
  const [step, setStep] = useState(1);

  const stepChangeHandler = value => {
    setStep(value);
  }

  return(
    <div className="App">
      <div className="container">
        <section className="intro">
          <header>
            <h1>Project Budget Calculator/PDF Generator</h1>
          </header>
          <main className="intro__body">
            <div className="intro__body_left">
              { step === 1 && <ProjectStart onStepChange={stepChangeHandler} /> }
              { step === 2 && <AddTask /> }
            </div>
            <div className="intro__body_right">
              <Overview />
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}

export default Start;