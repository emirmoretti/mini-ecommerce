import React from 'react'
import { ChakraProvider, Container, VStack, Image, Heading, Box, Divider, Text } from "@chakra-ui/react"
import { AppProps } from 'next/app'
import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Container borderRadius="sm" backgroundColor="white" boxShadow="md" marginY={4} maxWidth="container.lg" padding={4}>
          <VStack marginBottom={6}>
            <Image borderRadius={9999} alt="" src="https://via.placeholder.com/128"></Image>
            <Heading color="black">Bienvenidos</Heading>
            <Text  color="black">Al almacen del Barrio</Text>
          </VStack>
          <Divider />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App