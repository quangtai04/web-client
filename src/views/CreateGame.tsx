import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
} from 'reactstrap';
import { Image } from 'react-bootstrap';
import { ListQuestion } from '../components/CreateGame/ListQuestion';
import QuestionBank from '../components/QuestionBank.js';
import Modal_TrueFalse from './Modal_TrueFalse';
import '../assets/css/createGame.css';
import Modal_Save from './Modal_Save';
import { gameService } from '../services/game/api';
const CreateGame: React.FC = () => {
  const [data, setData] = useState([
    //[{question; image, listAnswer['A','B','C','D'], time, key}]
    {
      question: '',
      image:
        'https://res.cloudinary.com/vnu-uet/image/upload/v1604428182/111_vx6tvo.jpg',
      listAnswer: ['', '', '', ''],
      key: -1,
      time: 5,
    },
  ]);
  const [selected, setSelected] = useState(0);
  const [lengthData, setLengthData] = useState(data.length);
  const [showDelete, setShowDelete] = useState(false);
  const [showQuit, setShowQuit] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [index_delete_duplicate, setIndex_Del_Dup] = useState(-1);
  const [colorAnswer] = useState({
    answer_0: 'rgb(226,27,60)',
    answer_1: 'rgb(19,104,206)',
    answer_2: 'rgb(216,158,0)',
    answer_3: 'rgb(38,137,12)',
  });
  useEffect(() => {
    (document.getElementById('question') as HTMLInputElement).value =
      data[selected]['question'];
    for (var i = 0; i < 4; i++) {
      (document.getElementById('answer_' + i) as HTMLInputElement).value =
        data[selected]['listAnswer'][i];
      if (data[selected]['listAnswer'][i] != '') {
        document.getElementById('answer_' + i).style.backgroundColor = String(
          colorAnswer['answer_' + i],
        );
      } else {
        document.getElementById('answer_' + i).style.backgroundColor = 'white';
      }
      if (i == data[selected]['key']) {
        document.getElementById('resultanswer_' + i).style.backgroundColor =
          'rgb(102,191,57)';
      } else {
        document.getElementById('resultanswer_' + i).style.backgroundColor =
          'white';
      }
    }
    (document.getElementById('time') as HTMLInputElement).value = String(
      data[selected]['time'],
    );
  }, []);
  const removeQuestion = (index) => {
    try {
      if (lengthData > 1 && index != -1) {
        data.splice(index, 1);
        setLengthData(data.length);
        toast.success('Delete câu hỏi thành công!');
      } else {
        toast.error('Không thể xóa câu hỏi này!');
      }
    } catch (error) {
      toast.error('Delete ERROR!');
    }
  };
  const sendDataGame = (title, image_game) => {
    gameService
      .createGame({
        game_name: title,
        image_game: image_game,
        dataQuestion: data,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = '/admin/discover';
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const duplicateQuestion = (index, dataQuestion) => {
    try {
      var newData = {
        question: dataQuestion['question'],
        image: dataQuestion['image'],
        listAnswer: [
          dataQuestion['listAnswer'][0],
          dataQuestion['listAnswer'][1],
          dataQuestion['listAnswer'][2],
          dataQuestion['listAnswer'][3],
        ],
        key: dataQuestion['key'],
        time: dataQuestion['time'],
      };
      data.splice(index, 0, newData);
      setLengthData(data.length);
      toast.success('Duplicate câu hỏi thành công!');
    } catch (error) {
      toast.error('Duplicate ERROR!');
    }
  };
  const changeBackGround = (e) => {
    var id = e.target.id;
    var id_num = Number(id.substring(7, 8));
    data[selected]['listAnswer'][id_num] = e.target.value;
    if (e.target.value != '') {
      (document.getElementById(id) as HTMLInputElement).style.backgroundColor =
        colorAnswer[id];
    } else {
      (document.getElementById(id) as HTMLInputElement).style.backgroundColor =
        'white';
    }
  };
  const changeSelected = (value) => {
    setSelected(value);
    (document.getElementById('question') as HTMLInputElement).value =
      data[value]['question'];
    for (var i = 0; i < 4; i++) {
      (document.getElementById('answer_' + i) as HTMLInputElement).value =
        data[value]['listAnswer'][i];
      if (data[value]['listAnswer'][i] != '') {
        (document.getElementById(
          'answer_' + i,
        ) as HTMLInputElement).style.backgroundColor =
          colorAnswer['answer_' + i];
      } else {
        (document.getElementById(
          'answer_' + i,
        ) as HTMLInputElement).style.backgroundColor = 'white';
      }
      if (i == data[value]['key']) {
        (document.getElementById(
          'resultanswer_' + i,
        ) as HTMLInputElement).style.backgroundColor = 'rgb(102,191,57)';
      } else {
        (document.getElementById(
          'resultanswer_' + i,
        ) as HTMLInputElement).style.backgroundColor = 'white';
      }
    }
    (document.getElementById('time') as HTMLInputElement).value = String(
      data[value]['time'],
    );
  };
  const changeTime = (e) => {
    var time = Number(e.target.value);
    data[selected]['time'] = time;
  };
  const clickResultAnswer = (e) => {
    var id = e.target.id;
    var temp = id.substring(13, 14); // số thứ tự của ô lựa chọn [0,1,2,3]
    data[selected]['key'] = Number(temp);
    for (var i = 0; i < 4; i++) {
      if (i == Number(temp)) {
        (document.getElementById(
          id,
        ) as HTMLInputElement).style.backgroundColor = 'rgb(102,191,57)';
      } else {
        (document.getElementById(
          'resultanswer_' + i,
        ) as HTMLInputElement).style.backgroundColor = 'white';
      }
    }
  };
  const addQuestion = () => {
    var newData = {
      question: '',
      image:
        'https://res.cloudinary.com/vnu-uet/image/upload/v1604428182/111_vx6tvo.jpg',
      listAnswer: ['', '', '', ''],
      key: -1,
      time: 5,
    };
    data.push(newData);
    setLengthData(data.length);
    changeSelected(lengthData);
  };
  return (
    <>
      {/* Delete Question ? */}
      <Modal_TrueFalse
        show={showDelete}
        data={{
          title: 'Are you want delete question?',
          button_1: {
            title: 'No',
            backgroundColor: 'rgb(242,242,242)',
            color: 'black',
          },
          button_2: {
            title: 'Yes',
            backgroundColor: 'rgb(226,27,60)',
            color: 'white',
          },
        }}
        setClose={() => {
          setShowDelete(false);
        }}
        funcButton_1={() => console.log("Don't delete!")}
        funcButton_2={() => {
          removeQuestion(index_delete_duplicate);
          setIndex_Del_Dup(-1);
        }}
        funcOnHide={() => console.log('Hide Modal')}></Modal_TrueFalse>
      {/* Quit Create game */}
      <Modal_TrueFalse
        show={showQuit}
        data={{
          title:
            'Hold on - are you sure you want to discard all unsaved changes? You won’t be able to restore these changes.?',
          button_1: {
            title: 'No',
            backgroundColor: 'rgb(242,242,242)',
            color: 'black',
          },
          button_2: {
            title: 'Yes',
            backgroundColor: 'rgb(226,27,60)',
            color: 'white',
          },
        }}
        setClose={() => {
          setShowQuit(false);
        }}
        funcButton_1={() => console.log("Don't quit")}
        funcButton_2={() => {
          window.location.href = '/admin/index';
        }}
        funcOnHide={() => console.log('Hide Modal')}></Modal_TrueFalse>
      {/* Save Game */}
      <Modal_Save
        title=""
        image_game=""
        show={showSave}
        funcQuit={() => console.log("Don't Save")}
        funcSave={(title, image_game) => {
          sendDataGame(title, image_game);
        }}
        setClose={() => {
          setShowSave(false);
        }}></Modal_Save>
      {/* <Container fluid> */}
      <Row>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            {/* Header  */}
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="11">
                  <h3 className="mb-0">"New Kahoot"</h3>
                </Col>
              </Row>
            </CardHeader>
            {/*  */}
            <CardBody style={{ backgroundColor: 'white' }}>
              <div className="mt--4">
                <Row className="justify-content-md-center">
                  {/* Navbar */}
                  <Col
                    lg="3"
                    style={{
                      borderRight: '2px solid rgb(200,200,200)',
                    }}>
                    {/* List Question */}
                    <div className="container" id="listGame">
                      <ListQuestion
                        data={data}
                        lengthData={lengthData}
                        selected={selected}
                        funSetSelected={(value) => {
                          changeSelected(value);
                        }}
                        funRemoveQuestion={(index) => {
                          setShowDelete(true);
                          setIndex_Del_Dup(index);
                        }}
                        funDuplicate={(index, dataQuestion) =>
                          duplicateQuestion(index, dataQuestion)
                        }></ListQuestion>
                      {/* End list question */}
                      <div className="mt-2">
                        <Button
                          style={{
                            width: '100%',
                            color: 'white',
                            backgroundColor: 'rgb(55,155,255)',
                          }}
                          onClick={(e) => {
                            // e.preventDefault();
                            addQuestion();
                          }}>
                          Add Question
                        </Button>
                        <div className="mt-2">
                          <QuestionBank
                            data={data}
                            refreshData={(qb) => {}}
                            widthButton="100%"
                            nameButton="Question Bank"
                            colorButton="rgb(120,77,251)"></QuestionBank>
                        </div>
                      </div>
                    </div>
                  </Col>
                  {/* End Navbar */}

                  {/* Body Create game */}
                  <Col lg="9" style={{ background: 'white' }} className="mb-4">
                    <div className="row d-flex justify-content-center">
                      <div className="col-11">
                        <Input
                          autoComplete="off"
                          id="question"
                          className="question"
                          onChange={(e) => {
                            data[selected]['question'] = e.target.value;
                          }}></Input>
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-3 text-center" id="div_time">
                        Time: <br />
                        <select id="time" onChange={(e) => changeTime(e)}>
                          <option value="5">5 sec</option>
                          <option value="10">10 sec</option>
                          <option value="20">20 sec</option>
                          <option value="30">30 sec</option>
                          <option value="60">60 sec</option>
                          <option value="90">90 sec</option>
                          <option value="120">120 sec</option>
                          <option value="240">240 sec</option>
                        </select>
                      </div>

                      <div className="col-6 mt-3">
                        <Image
                          src="http://placehold.it/450x250"
                          id="image"
                          className="image"
                        />
                      </div>
                      <div className="col-3"></div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-12 mt-4">
                        <div className="row d-flex justify-content-between">
                          <div className="col-6">
                            <div className="input-group mb-3 ">
                              <div className="input-group-prepend">
                                <span
                                  className="input-group-text"
                                  id="iconAnswer1">
                                  A.
                                </span>
                              </div>
                              <input
                                autoComplete="off"
                                onChange={(e) => changeBackGround(e)}
                                id="answer_0"
                                type="text"
                                className="form-control"
                                aria-describedby="iconAnswer1"
                              />
                              <div className="input-group-prepend">
                                <button
                                  className="input-group-text"
                                  id="resultanswer_0"
                                  onClick={(e) => {
                                    // e.preventDefault();
                                    clickResultAnswer(e);
                                  }}></button>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="input-group mb-3 ">
                              <div className="input-group-prepend">
                                <span
                                  className="input-group-text"
                                  id="iconAnswer2">
                                  B.
                                </span>
                              </div>
                              <input
                                autoComplete="off"
                                id="answer_1"
                                onChange={(e) => changeBackGround(e)}
                                type="text"
                                className="form-control"
                                aria-describedby="iconAnswer2"
                              />
                              <div className="input-group-prepend">
                                <button
                                  className="input-group-text"
                                  id="resultanswer_1"
                                  onClick={(e) => {
                                    // e.preventDefault();
                                    clickResultAnswer(e);
                                  }}></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row d-flex justify-content-between">
                          <div className="col-6">
                            <div className="input-group mb-3 ">
                              <div className="input-group-prepend">
                                <span
                                  className="input-group-text"
                                  id="iconAnswer3">
                                  C.
                                </span>
                              </div>
                              <input
                                autoComplete="off"
                                id="answer_2"
                                onChange={(e) => changeBackGround(e)}
                                type="text"
                                className="form-control"
                                aria-describedby="iconAnswer3"
                              />
                              <div className="input-group-prepend">
                                <button
                                  className="input-group-text"
                                  id="resultanswer_2"
                                  onClick={(e) => {
                                    // e.preventDefault();
                                    clickResultAnswer(e);
                                  }}></button>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="input-group mb-3 ">
                              <div className="input-group-prepend">
                                <span
                                  className="input-group-text"
                                  id="iconAnswer4">
                                  D.
                                </span>
                              </div>
                              <input
                                autoComplete="off"
                                id="answer_3"
                                onChange={(e) => changeBackGround(e)}
                                type="text"
                                className="form-control"
                                aria-describedby="iconAnswer4"
                              />
                              <div className="input-group-prepend">
                                <button
                                  className="input-group-text"
                                  id="resultanswer_3"
                                  onClick={(e) => {
                                    // e.preventDefault();
                                    clickResultAnswer(e);
                                  }}></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </CardBody>
            <CardFooter>
              <div className="row d-flex justify-content-between">
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn btn-outline-dark"
                    id="quit_button"
                    onClick={() => setShowQuit(true)}>
                    Quit
                  </button>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    id="save_button"
                    onClick={() => setShowSave(true)}>
                    Save
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
      {/* </Container> */}
    </>
  );
};

export default CreateGame;