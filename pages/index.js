import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button} from '@chakra-ui/react';
import { baseUrl, fetchData} from '../utils/fetchAPI'
import Property  from '@/components/Property';

const Banner = ({ imageUrl, purpose, title1, title2, desc1, desc2, linkName, buttonText }) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image src={imageUrl} width={500} height={300} alt="banner" />
      <Box p="5">
        <Text color="gray.400" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="medium">
          {title1} <br />
          {title2}
        </Text>
        <Text fontSize="lg" paddingTop="3" fontWeight="medium" color="gray.700">
          {desc1} <br /> {desc2}
        </Text>
        <Button fontSize="xl" bg="blue.300" color="white">
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};



export default function Home({propertiesForSale, propertiesForRent}) {
  console.log(propertiesForSale, propertiesForRent)
  return (
    <Box className={``} >
          <h1>Hello-world</h1>
          <Banner
            purpose='RENT A HOME'
            title1='Rental Homes for'
            title2='Everyone'
            desc1=' Explore from Apartments, builder floors, villas'
            desc2='and more'
            buttonText='Explore Renting'
            linkName='/search?purpose=for-rent'
            imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
          />
          <Flex flexWrap='wrap'>
          {propertiesForRent && propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
          <Banner
            purpose='BUY A HOME'
            title1=' Find, Buy & Own Your'
            title2='Dream Home'
            desc1=' Explore from Apartments, land, builder floors,'
            desc2=' villas and more'
            buttonText='Explore Buying'
            linkName='/search?purpose=for-sale'
            imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
          />
          <Flex flexWrap="wrap">
          {/* Fetch the properties and map over them for buy A home*/
          propertiesForSale && propertiesForSale.map((property) => {
            <Property property={property} key={property.id}/>
          })
          }
        </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchData(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchData(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

