import { Grid, Stack, Text, Button, Link, Image, Box, Flex } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import React from 'react';
import { Type } from 'typescript';
import api from '../product/api';
import { Product } from '../product/types';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
}

const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([])
  const [selectedImage, setSelectedImage] = React.useState<string>(null)
  const text = React.useMemo(() => {
    return cart.reduce((message, product) => message.concat(`* ${product.title} -  ${parseCurrency(product.price)} \n`), ``)
      .concat(`\n Total: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
  }, [cart])

  return (
    <AnimateSharedLayout type="crossfade">
      <Stack spacing={6}>
        <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
          {products.map(product =>
            <Stack spacing={3} borderRadius="md" padding={4} key={product.id} backgroundColor="gray.100">
              <Image onClick={() => setSelectedImage(product.image)} as={motion.img} cursor="pointer" layoutId={product.image} maxHeight={200} borderRadius="md" objectFit="cover" src={product.image} alt={product.title} />
              <Stack spacing={1}>
                <Text textColor="black">{product.title}</Text>
                <Text textColor="green.500" fontSize="sm" fontWeight="500">{parseCurrency(product.price)}</Text>
              </Stack>
              <Button colorScheme="primary" variant="outline" onClick={() => setCart(cart => cart.concat(product))}>Agregar</Button>
            </Stack>)}
        </Grid>
        {Boolean(cart.length) && <Flex alingItems="center" justifyContent="center" padding={4} position="sticky" bottom={0}>
          <Button leftIcon={<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff" />} width="fit-auto" as={Link} href={`https://wa.me/543412754980?text=${encodeURIComponent(text)}`} isExternal colorScheme="whatsapp">Completar pedido ({cart.length} productos)</Button></Flex>}
      </Stack>
      <AnimatePresence>
        {selectedImage && <Flex key="backdrop"
          alignItems="center" as={motion.div}
          backgroundColor="rgba(0,0,0,0.5)"
          justifyContent="center"
          layoutId={selectedImage}
          position="fixed"
          top={0}
          left={0}
          height="100%"
          width="100%"
          onClick={() => setSelectedImage(null)}
          ><Image key="imagen" src={selectedImage} /></Flex>}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list()
  return {
    revalidate: 10,
    props: {
      products,
    },
  }
};

export default IndexRoute;