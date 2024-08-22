const createResult = (error, data) => {
  const result = {}
  if (error) {
    result['status'] = 'error'
    result['error'] = error
  } else {
    result['status'] = 'success'
    result['data'] = data
  }

  return result
}

const createErrorResult = (error) => {
  const result = {}
  result['status'] = 'error'
  result['error'] = error

  return result
}

const createSuccessResult = (data) => {
  const result = {}
  result['status'] = 'success'
  result['data'] = data

  return result
}

module.exports = {
  createResult,
  createErrorResult,
  createSuccessResult,
}
