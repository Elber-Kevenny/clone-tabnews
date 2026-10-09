const status = (_request, response) => {
  response.status(200).json({massa: 'massinha'})
}


export default status;