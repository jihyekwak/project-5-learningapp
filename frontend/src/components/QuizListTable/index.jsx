import { useState, useEffect } from 'react';
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as quizService from "../../api/quiz.service";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const QuizListTable= () => {

    const classes = useStyles();
    const [quizList, setQuizList] = useState([])

    const fetchQuizzes = async () => {
        await quizService.getAll().then((res) => {
            setQuizList(res.data)
        })
    };

    useEffect(() => {
        fetchQuizzes()
    }, [])

    return(
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Subject</TableCell>
                    <TableCell align="right">Grade</TableCell>
                    <TableCell align="right">Difficulty</TableCell>
                    <TableCell align="right">Created_at</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {quizList.map((quiz) => (
                <TableRow key={quiz.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {quiz.title}
                    </TableCell>
                    <TableCell align="right">{quiz.subject}</TableCell>
                    <TableCell align="right">{quiz.grade}</TableCell>
                    <TableCell align="right">{quiz.difficulty}</TableCell>
                    <TableCell align="right">{quiz.created_at}</TableCell>
                    <TableCell>
                        <Link 
                            color="textPrimary"
							href={`/quiz/${quiz.id}/edit`}
							className={classes.link}><EditIcon></EditIcon></Link>
                        <Link 
                            color="textPrimary"
							className={classes.link}><DeleteForeverIcon></DeleteForeverIcon></Link>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
    )
}

export default QuizListTable;