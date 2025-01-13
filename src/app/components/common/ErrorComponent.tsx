import { Button, Typography } from '@mui/material';

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" color="error" textAlign="center">
        {message}
      </Typography>
      <Button
        variant="contained"
        color="info"
        sx={{ marginTop: 2 }}
        onClick={() => window.location.reload()}
      >
        Try again
      </Button>
    </div>
  );
};

export default ErrorComponent;
