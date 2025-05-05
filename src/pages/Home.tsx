import { Heading, Box, Input, InputGroup, NativeSelect } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import React from 'react';
import { useNavigate } from 'react-router';
import { options } from '@/utils/index.ts';

const Home = () => {
  const navigate = useNavigate();
  const [queryInput, setQueryInput] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${queryInput}&category=${category}`);
  };
  return (
    <>
      <Box
        width={'100vw'}
        height={'100vh'}
        display="flex"
        justifyContent={'center'}
        alignItems={'center'}
        flexFlow={'column'}
        gap={'2'}
        border="1px solid red"
      >
        <Box textAlign={'center'}>
          <Heading>PN Search Engine</Heading>
          {/* SelectBy */}
          <NativeSelect.Root size="sm" width="240px" position={'absolute'} top="1rem" right="1rem">
            <NativeSelect.Field padding="0 1rem" onChange={(e) => setCategory(e.target.value)}>
              <option disabled defaultChecked>
                Search By
              </option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          {/* Searchbar */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            width={{ base: '80vw', lg: '50vw' }}
            marginTop="1rem"
          >
            <InputGroup
              flex="1"
              startElement={<LuSearch color="#fff" style={{ marginLeft: '1rem' }} />}
            >
              <Input
                placeholder="Search"
                borderRadius="full"
                _placeholder={{ color: '#fff', fontSize: '1rem' }}
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                fontSize="1rem"
              />
            </InputGroup>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
