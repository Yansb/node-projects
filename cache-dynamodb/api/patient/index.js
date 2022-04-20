const AWS = require('aws-sdk')

const patientRepository = require('./repository/patient')
const examRepository = require('./repository/exam')
const medicineRepository = require('./repository/medicine')

AWS.config.update({
  region: "us-east-1",
})

const dynamodbClient = new AWS.DynamoDB.DocumentClient()
const dynamoPatientsTable = 'patients'

const addPatientToCache = async patient => {
  const now = Math.round(new Date().getTime() / 1000)
  const params = {
    TableName: dynamoPatientsTable,
    Item: {...patient, expiresAt: now + 3600} // 1 hour from now
  }

  return dynamodbClient.put(params).promise()
}

const getPatientFromCache = async patientId => {
  const params = {
    TableName: dynamoPatientsTable,
    Key: {
      id: +patientId
    }
  }

  return dynamodbClient.get(params).promise().then(result => result.Item)
  .catch(e => {
    console.error(e);
    return
  })
}

const getPatientInfo = async patientId => {
    let patientData = await getPatientFromCache(patientId)

    if (patientData){
      return patientData;
    }

    const patient = await patientRepository.findById(patientId)
    const exams = await examRepository.findAllByPatientId(patientId)
    const medicines = await medicineRepository.findAllByPatientId(patientId)

    patientData = {
      ...patient.dataValues,
      createdAt: patient.createdAt.toISOString(),
      updatedAt: patient.updatedAt.toISOString(),
      exams: exams.map(exam => ({
              name: exam.name,
              result: exam.result,
              date: exam.date.toISOString()
          })
      ),
      medicines: medicines.map(medicine =>({
              name: medicine.name,
              date: medicine.date.toISOString()
          })
      ),
    }

    await addPatientToCache(patientData)

    return patientData
}

module.exports = {
    getPatientInfo
}
