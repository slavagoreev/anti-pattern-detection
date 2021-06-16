import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Container, Jumbotron, Row, Tab, Col, Nav, Button, Alert, ListGroup} from "react-bootstrap";
import Editor from "@monaco-editor/react";
import { files } from "../utils/files"
import {useCallback, useRef, useState} from "react";

const t = {
  data_class: 'Data class',
  feature_envy: 'Feature envy',
  god_classes: 'God class',
  parallel_inheritance_hierarchies: 'Parallel inheritance'
}

export default function Home() {
  const [fileName, setFileName] = useState("Sample1.java");
  const currentContent = useRef('');
  const [isLoading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const file = files[fileName];

  const analyze = useCallback(() => {
    setLoading(true);
    const formData = new FormData();
    const blob = new Blob([currentContent.current || file.value], { type: 'text/plain' });
    formData.append('file', blob, fileName);

    fetch('https://antipattern.detection.the-o.co/predict', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then((prediction) => {
        setPrediction(prediction);
      })
      .catch(() => setPrediction('Server is not responding'))
      .finally(() => {
        setLoading(false);
      });
  }, [file]);

  return (
    <div >
      <Head>
        <title>Anti-pattern detection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Jumbotron fluid>
          <Container>
            <h3>Anti-pattern Detection Using Machine Learning</h3>
            <h6 className="text-muted">Artemii Bykov, Maxim Salo, Vyacheslav Goreev</h6>
            <p className={styles.description}>
              Demonstration of analyzing a real-world code using machine learning.
              The syntax flaw detection may be formalized using type rules or content-free grammars.
              However, many anti-patterns do not have a straightforward definition because there
              exist no standard notations which can be used to describe them.
            </p>
          </Container>
        </Jumbotron>
        <section>
          <Container>
            <Row>
              <Col md={3} className={styles.menu}>
                <Nav variant="pills" className="flex-column">
                  {Object.keys(files).map(file => (
                    <Nav.Item key={file}>
                      <Nav.Link
                        eventKey={file}
                        active={fileName === file}
                        disabled={fileName === file}
                        onClick={() => setFileName(file)}
                      >
                        {file}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <hr className="dropdown-divider my-5"/>
                <Button variant="primary" onClick={() => analyze()}>
                  {isLoading ? 'Loading…' : `Analyze "${fileName}"`}
                </Button>
                {!isLoading ? (typeof prediction === 'string' ? <Alert>{prediction}</Alert> : prediction && (
                  <ListGroup className="mt-3">
                    {Object.entries(prediction).map(([key, prob]) => (
                      <ListGroup.Item key={key}>{t[key]} {(prob * 100).toFixed(2)}%</ListGroup.Item>
                    ))}
                  </ListGroup>
                )) : null}
              </Col>
              <Col md={9}>
                <header className={styles.header}>
                  <span className={styles.header__title}>
                    {file.name}
                  </span>
                </header>
                <Editor
                  height="90vh"
                  theme="vs-dark"
                  path={file.name}
                  defaultLanguage={file.language}
                  defaultValue={file.value}
                  onChange={(content) => currentContent.current = content}
                />
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  )
}
