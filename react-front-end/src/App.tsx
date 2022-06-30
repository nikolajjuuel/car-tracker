import "./App.css";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import {
  Button,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ModalPerson from "./components/ModalPerson";
import ModalCar from "./components/ModalCar";
import ModalAddPerson from "./components/ModalAddPerson";
import ModalAddCar from "./components/ModalAddCar";
import DeleteIcon from "@mui/icons-material/Delete";

import Typography from "@mui/material/Typography";

function App() {
  const url = "http://localhost:3000/people";
  const [data, setData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const people = (data: any) => {
    const people = {};

    data.map((person: any) => {
      // @ts-ignore to ignore the type checking errors on the next line in a TypeScript file
      people[person.id] = person.firstName;
    });
    return { people };
  };

  const reload = () => {
    axios.get(url).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then((res) => {
      setIsLoading(false);
      setData(res.data);
    });
  }, []);

  const handleDeletePerson = (id: string) => {
    axios
      .delete(`http://localhost:3000/people/${id}`)
      .then(function (response) {
        reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeleteCar = (id: string) => {
    axios
      .delete(`http://localhost:3000/cars/${id}`)
      .then(function (response) {
        reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box className="App">
      <h1>Car Tracker</h1>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <ReactLoading
            type={"spin"}
            color={"purple"}
            height={"5%"}
            width={"5%"}
          />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ModalAddPerson reload={reload} />
            <ModalAddCar people={people(data)} reload={reload} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Owners</h2>

            {data?.map((person: any) => (
              <Accordion
                expanded={expanded === person.id}
                onChange={handleChange(person.id)}
                key={person.id}
                sx={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ fontWeight: "bold" }}>
                          {person.firstName} {person.lastName}
                        </Box>
                        <Box
                          sx={{ marginLeft: 1 }}
                        >{` - cars [${person.cars?.length}] `}</Box>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <ModalPerson
                          firstName={person.firstName}
                          lastName={person.lastName}
                          email={person.email}
                          personId={person.id}
                          reload={reload}
                        />
                        <Box
                          onClick={() => handleDeletePerson(person.id)}
                          sx={{ color: "red" }}
                        >
                          <DeleteIcon
                            onClick={() => handleDeletePerson(person.id)}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {person.cars?.map((car: any) => (
                      <Box key={car.id} sx={{ display: "flex" }}>
                        <Box>{` • ${car.year} ${car.make} ${car.model} - $${car.price}`}</Box>
                        <Box sx={{ display: "flex" }}>
                          <ModalCar
                            carId={car.id}
                            year={car.year}
                            make={car.make}
                            model={car.model}
                            price={car.price}
                            owner={person.firstName}
                            person_id={person.id}
                            people={people(data)}
                            reload={reload}
                          />
                          <Box
                            onClick={() => handleDeleteCar(car.id)}
                            sx={{ color: "red" }}
                          >
                            <DeleteIcon />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Typography>
                </AccordionDetails>

                {/* </Box> */}
              </Accordion>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default App;
