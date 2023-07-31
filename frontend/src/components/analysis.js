import React, {useState, useEffect} from 'react'
import output from '../constants/output'
import Cards from './cards'

const Analysis = ({audioAnalysis}) => {
  const [gridColumns, setGridColumns] = useState(3);
  // console.log("paceDescription :", audioAnalysis.paceAnalysis[0])

  // Fix this for large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setGridColumns(1);
      } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
        setGridColumns(2);
      } else {
        setGridColumns(2);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call handleResize initially
    handleResize();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div style={{ padding: 50 }}>
      <h1 style={{ paddingBottom: 20 }}>Analysis</h1>
      <div style={{ paddingLeft: 150, paddingRight: 150 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ paddingRight: 20, fontSize: 20, fontWeight: 500, width: 200, textAlign: 'start' }}>
            Original Text:
          </p>
          <p style={{ textAlign: "start" }}>
            {audioAnalysis.originalText}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ paddingRight: 20, fontSize: 20, fontWeight: 500, width: 200, textAlign: 'start' }}>
            Corrected Text:
          </p>
          <p style={{ textAlign: "start" }}>
            {audioAnalysis.correctedText}
          </p>
        </div>
      </div>
      <div style={{
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: '40px',
        padding: 50,
        
      }}>
        <Cards 
          title="Pace" 
          score={audioAnalysis.pace} 
          comment={audioAnalysis.paceAnalysis[0]} 
          description={audioAnalysis.paceAnalysis[1]} 
          color={audioAnalysis.paceAnalysis[2]}
        /> 
        <Cards 
          title="Confidence"  
          score={audioAnalysis.confidence} 
          comment={audioAnalysis.confidenceAnalysis[0]} 
          description={audioAnalysis.confidenceAnalysis[1]}
          color={audioAnalysis.confidenceAnalysis[2]}
        /> 
        <Cards 
          title="Errors" 
          score={audioAnalysis.errors} 
          comment={audioAnalysis.errorsAnalysis[0]} 
          description={audioAnalysis.errorsAnalysis[1]}
          color={audioAnalysis.errorsAnalysis[2]}
        />
        <Cards 
          title="Fillers & Long Pauses" 
          score={audioAnalysis.fillers} 
          comment={audioAnalysis.fillersAnalysis[0]} 
          description={audioAnalysis.fillersAnalysis[1]}
          color={audioAnalysis.fillersAnalysis[2]}
        /> 
      </div>
    </div>
  )
}

export default Analysis