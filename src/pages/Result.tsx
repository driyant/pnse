import { generateBaseURL, options } from '@/utils';
import { Box, Heading, Input, InputGroup, Link, NativeSelect } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { fetchData } from '@/lib';

const Result = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const selectedCategory = searchParams.get('category');
  const [category, setCategory] = React.useState<string | null>(selectedCategory);
  const [queryInput, setQueryInput] = React.useState<string | null>(query);

  const fetchData = async () => {
    if (process.env.NODE_ENV === 'development') {
      const response = await fetch(generateBaseURL(selectedCategory || 'web'));
      const data = await response.json();
      console.log(data);
    } else {
      const response = await fetch(generateBaseURL(selectedCategory || 'web'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: queryInput }),
      });
      const data = await response.json();
      console.log(data);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${queryInput}&category=${category}`);
  };

  React.useEffect(() => {
    fetchData();
  }, [category, query, selectedCategory]);

  return (
    <>
      <Box as="section" width={'100vw'} height={'100vh'}>
        {/* SelectBy */}
        <Box display="flex" justifyContent="flex-end" marginTop="1rem" marginRight="1rem">
          <NativeSelect.Root size="sm" width="240px">
            <NativeSelect.Field
              padding="0 1rem"
              onChange={(e) => {
                setCategory(e.target.value);
                navigate(`/search?query=${queryInput}&category=${e.target.value}`);
              }}
            >
              <option disabled>Search By</option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
        {/*  */}
        <Box
          display="flex"
          justifyContent={'center'}
          alignItems={'center'}
          flexFlow="column"
          marginTop="4rem"
        >
          <Link href="/">
            <Heading>PN Search</Heading>
          </Link>
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
                value={queryInput || ''}
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

export default Result;
