import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, IconButton, Button } from '@mui/material';
import { PropTypes } from 'prop-types';

const ItemsTable = ({ data, icon, deleteHandler, navigateHandler }) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
      {data && data.length != 0 ? (
        <Table  aria-label="simple table">
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <span style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <Button variant="text" onClick={() => navigateHandler(row._id)} style={{ color: 'black'}}>
                      {icon}
                      {row.name}
                    </Button>
                  </span>
                </TableCell>
                <TableCell align="left">{row.count} photos</TableCell>
                {/* <TableCell align="left">{row.favouriteCount?row.favouriteCount:0} favourites</TableCell> */}
                {/* <TableCell align="center">
                  <IconButton aria-label="delete" onClick={() => deleteHandler(row._id)}>
                    <DeleteIcon
                      style={{
                        color: 'red',
                        fontSize: '1.25rem'
                      }}
                    />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No results found</div>
      )}
    </TableContainer>
  );
};

export default ItemsTable;
