import React from 'react'
import Modal from 'react-modal'
import { isEqual } from 'lodash'

import Box from 'components/Box'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minWidth: '300px',
    minHeight: '200px',
  },
}

export interface BikeType {
  bike_id?: string
  lat?: number
  lon?: number
  is_reserved?: number
  is_disabled?: boolean
  vehicle_type?: string
  total_bookings?: string
  android?: string
  ios?: string
}

export interface ModalType {
  selectedBike: BikeType
  onClose: () => void
}

const areEqual = (nextProps: { selectedBike: BikeType }, previousProps: { selectedBike: BikeType }) => {
  return isEqual(nextProps.selectedBike, previousProps.selectedBike)
}

const DetailModal = React.memo(({ selectedBike, onClose }: ModalType) => {
  return (
    <Modal isOpen={true} style={customStyles} contentLabel='Example Modal'>
      <Box as='h2' textAlign='center' mb={1}>
        Bike Detail
      </Box>
      <hr />
      <Box display='flex'>
        <Box width='50%' mr={4}>
          bike_id
        </Box>
        <Box width='50%' mr={4}>
          {selectedBike?.bike_id}
        </Box>
      </Box>
      <Box display='flex'>
        <Box width='50%' mr={4}>
          lat
        </Box>
        <Box width='50%' mr={4}>
          {selectedBike?.lat}
        </Box>
      </Box>
      <Box display='flex'>
        <Box width='50%' mr={4}>
          lon
        </Box>
        <Box width='50%' mr={4}>
          {selectedBike?.lon}
        </Box>
      </Box>
      <Box display='flex'>
        <Box width='50%' mr={4}>
          is_reserved
        </Box>
        <Box width='50%' mr={4}>
          {selectedBike?.is_reserved ? 'Reserved' : 'Not Reserved'}
        </Box>
      </Box>
      <Box display='flex'>
        <Box width='50%' mr={4}>
          is_disabled
        </Box>
        <Box width='50%' mr={4}>
          {selectedBike?.is_disabled ? 'Disabled' : 'Not Disabled'}
        </Box>
      </Box>
      <Box display='flex'>
        <Box width='50%' mr={4}>
          vehicle_type
        </Box>
        <Box width='50%' mr={4}>
          {selectedBike?.vehicle_type}
        </Box>
      </Box>
      <Box display='flex'>
        <Box width='50%' mr={4}>
          total_bookings
        </Box>
        <Box width='50%' mr={4}>
          {selectedBike?.total_bookings}
        </Box>
      </Box>
      <Box display='flex'>
        <Box width='50%' mr={4}>
          android
        </Box>
        <Box width='50%' mr={4}>
          {selectedBike?.android}
        </Box>
      </Box>
      <Box display='flex'>
        <Box width='50%' mr={4}>
          ios
        </Box>
        <Box width='50%' mr={4}>
          {selectedBike?.ios}
        </Box>
      </Box>
      <hr />
      <Box display='flex' justifyContent='center' m={2}>
        <Box
          as='button'
          color='alert'
          backgroundColor='lightGrey'
          p={2}
          onClick={onClose}
        >
          Close
        </Box>
      </Box>
    </Modal>
  )
}, areEqual)

DetailModal.displayName = 'DetailModal'

export default DetailModal
