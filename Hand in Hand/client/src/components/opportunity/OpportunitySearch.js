import React, { useContext } from "react"
import { OpportunityContext } from "../../providers/OpportunityProvider"
import "./Opportunity.css"

export const OpportunitySearch = () => {
  const { setSearchTerms } = useContext(OpportunityContext)

  return (
    <>
      
      <input type="text"
        className="input--wide search rounded"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search opportunities . . ." />
    </>
  )
}
