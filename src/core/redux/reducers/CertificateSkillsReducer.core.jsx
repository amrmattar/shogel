import { createSlice } from '@reduxjs/toolkit'
const certificateData = {
    fCertificate: [],
    fCertificateRate: [],
}

const CertificateSkillsReducer = createSlice({
    name: 'CertificateSkillsReducer',
    initialState: certificateData,
    reducers: {
        getCertificate: (state, { payload }) => {
            state.fCertificate.push(payload)
        },
        deleteCertificate: (state, { payload }) => {
            state.fCertificate = state.fCertificate?.filter(({ id }) => id !== payload)
        },
        getCertificateRate: (state, action) => ({
            ...state,
            fCertificateRate: action.payload
        }),
    }
})

export default CertificateSkillsReducer.reducer
export const { getCertificate, getCertificateRate, deleteCertificate } = CertificateSkillsReducer.actions