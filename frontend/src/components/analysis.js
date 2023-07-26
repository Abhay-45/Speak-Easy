import React from 'react'
import output from '../constants/output'
import Cards from './cards'

const Analysis = () => {
  return (
    <div style={{ padding: 50 }}>
      <h1 style={{ paddingBottom: 20 }}>Analysis</h1>
      <div style={{ paddingLeft: 150, paddingRight: 150 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ paddingRight: 20, fontSize: 20, fontWeight: 500, width: 700, textAlign: 'start' }}>
            Original Text:
          </p>
          <p style={{ textAlign: "start" }}>
            {/* {output.original_text} */}
            playing/hiding content based on user interaction. It's commonly used in scenarios like opening/closing a modal, expanding/collapsing a dropdown, or toggling a menu.
            The toggle can be a boolean state variable that you set and change using setState (in class components) or React's useState hook (in functional components). When the toggle state changes, it can trigger different UI changes or show/hide specific components or content.
            Here's an example of how a toggle can be implemented using React's useState hook:
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ paddingRight: 20, fontSize: 20, fontWeight: 500, width: 700, textAlign: 'start' }}>
            Corrected Text:
          </p>
          <p style={{ textAlign: "start" }}>
            {/* {output.original_text} */}
            playing/hiding content based on user interaction. It's commonly used in scenarios like opening/closing a modal, expanding/collapsing a dropdown, or toggling a menu.
            The toggle can be a boolean state variable that you set and change using setState (in class components) or React's useState hook (in functional components). When the toggle state changes, it can trigger different UI changes or show/hide specific components or content.
            Here's an example of how a toggle can be implemented using React's useState hook:
          </p>
        </div>
      </div>
      <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', padding: 50}}>
        <Cards title="Pace" score="85" description="Very good"> </Cards>
        <Cards title="Pace" score="85" description="Very good"> </Cards>
        <Cards title="Pace" score="85" description="Very good"> </Cards>
        <Cards title="Pace" score="85" description="Very good"> </Cards>
        <Cards title="Pace" score="85" description="Very good"> </Cards>
        <Cards title="Pace" score="85" description="Very good"> </Cards>
      </div>
    </div>
  )
}

export default Analysis