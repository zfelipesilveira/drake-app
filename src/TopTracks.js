import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams } from 'react-router-dom';

function TopTracks() {
  const [topTracks, setTopTracks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { username } = useParams();

  

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/top-tracks/${username}`);
        setTopTracks(response.data);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    fetchTopTracks();
  }, [username]);

  const toggleFavorite = (index) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter((favIndex) => favIndex !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  return (
    <div className="top-tracks-container">
      <h2>Top 100 Tracks of Drake</h2>
      <List>
        {topTracks.map((track, index) => (
          <ListItem key={index} className="track-item">
            <ListItemIcon>
              <IconButton onClick={() => toggleFavorite(index)}>
                {favorites.includes(index) ? <StarIcon color="warning" /> : <StarBorderIcon />}
              </IconButton>
            </ListItemIcon>
            <ListItemText primary={track} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TopTracks;