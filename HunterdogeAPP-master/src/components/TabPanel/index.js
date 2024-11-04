const TabPanel = ({value, index , children}) => {
  return(
    <>
      {value === index && children}
    </>
  )
}

export default TabPanel;