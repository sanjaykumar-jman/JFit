import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Box, Button, Typography, Container, Stack } from "@mui/material";

// Type Definitions
interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  target: string;
}

const BASE_API_URL = "https://exercisedb.p.rapidapi.com";

const API_HEADERS = {
  "X-RapidAPI-Key": "2a2f8f587dmsh38516a70a23a50cp1d2eebjsnb4a41ab3c0e3", // Replace with your actual API key
  "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
};

const FitnessExercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");

  // Fetch available body parts on component mount
  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await axios.get<string[]>(`${BASE_API_URL}/exercises/bodyPartList`, { headers: API_HEADERS });
        setBodyParts(response.data);
      } catch (error) {
        console.error("Error fetching body parts:", error);
      }
    };

    fetchBodyParts();
  }, []);

  // Fetch exercises when a body part is selected
  useEffect(() => {
    if (selectedBodyPart) {
      fetchExercisesByBodyPart(selectedBodyPart);
    }
  }, [selectedBodyPart]);

  const fetchExercisesByBodyPart = async (bodyPart: string) => {
    try {
      const response = await axios.get<Exercise[]>(`${BASE_API_URL}/exercises/bodyPart/${encodeURIComponent(bodyPart)}`, { headers: API_HEADERS });
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Fitness Exercise Library
      </Typography>

      {/* Body Parts Section - Now in one line with horizontal scroll */}
      <Typography variant="h5" fontWeight="bold" marginTop={3}>
        Select Body Part
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "10px 0",
          gap: "8px",
        }}
      >
        {bodyParts.map((bodyPart) => (
          <Button
            key={bodyPart}
            variant={selectedBodyPart === bodyPart ? "contained" : "outlined"}
            onClick={() => setSelectedBodyPart(bodyPart)}
            sx={{ minWidth: "100px", fontSize: "14px" }} // Reduced button size
          >
            {bodyPart.toUpperCase()}
          </Button>
        ))}
      </Box>

      {/* Exercises Section */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3} marginTop={3}>
        {exercises.length === 0 ? (
          <Typography variant="body1" color="textSecondary" textAlign="center">
            {selectedBodyPart ? "No exercises found for this body part." : "Select a body part to see exercises."}
          </Typography>
        ) : (
          exercises.map((exercise) => (
            <Card key={exercise.id} sx={{ minHeight: "480px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <CardMedia component="img" height="250" image={exercise.gifUrl} alt={exercise.name} />

              {/* Reduced CardContent size */}
              <CardContent sx={{ padding: "8px", textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {exercise.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Target: {exercise.target}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
};

export default FitnessExercises;
