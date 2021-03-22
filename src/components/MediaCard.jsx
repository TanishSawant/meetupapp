import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory, Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.pngarts.com/files/1/Event-PNG-Photo.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Groups
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Join groups to make aquaintance with people having same interests as you have.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>{history.push('/groups')}}>
          Search Groups
        </Button>
        <Button size="small" color="primary" onClick={()=>{history.push('/Create_groups')}}>
          Create A Group
        </Button>
        
        <Button size="small" color="primary" onClick={()=>{history.push('/mygroups')}}>
          My Groups
        </Button>
        {/* <Link to={'/mygroups'} style={{textDecoration:'none', marginTop:'2%'}}>My Groups</Link> */}
      </CardActions>
    </Card>
  );
}