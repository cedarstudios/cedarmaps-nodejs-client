const CreateValidRequestMock = ({validMethod, validUrl, ignore = false}) => {
	return ({method, token, url}) => {
		if (!ignore  && (validMethod !== method || validUrl !== url)) throw Error()
		return Promise.resolve()
	}
}

module.exports = {
	CreateValidRequestMock
}
