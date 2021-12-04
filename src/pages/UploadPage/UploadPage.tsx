import React from 'react';
import { Button, Card, CardContent, Grid } from '@material-ui/core';

// components
import { MultipleFileUploadField } from '../../components/UploadComponent/MultipleFileUploadField';

function UploadPage() {

  const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			// post
		} catch (e) {
			console.log('Signup fail. Error: ', e);
		}
	};

	return (<>
  <form>
    <Card>
      <CardContent>
        <Grid container spacing={2} direction="column">
          <MultipleFileUploadField name="files" />
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </form>
  </>);
}

export default UploadPage;
