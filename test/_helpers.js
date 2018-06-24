const CreateValidRequestMock = ({validMethod, validUrl, ignore = false}) => {
	return ({method, token, url}) => {
		if (!ignore  && (validMethod !== method || validUrl !== decodeURIComponent(url))) throw Error(`Invalid method or url
		 | valid is ${validMethod}, ${validUrl}| provided ${method}, ${decodeURIComponent(url)}`)
		return Promise.resolve()
	}
}

module.exports = {
	CreateValidRequestMock
}
