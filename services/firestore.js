import { db } from '../firebaseConfig';
import { collection, doc, setDoc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';

export const addUser = (user) => {
  const userRef = doc(collection(db, 'users'), user.uid);
  return setDoc(userRef, user);
};

export const addBMIData = (bmiData) => {
  const bmiRef = doc(collection(db, 'bmiData'), bmiData.uid);
  return setDoc(bmiRef, bmiData);
};

export const getBMIData = async (uid) => {
  const bmiRef = doc(db, 'bmiData', uid);
  const bmiDoc = await getDoc(bmiRef);
  if (bmiDoc.exists()) {
    return bmiDoc.data();
  } else {
    console.log('No such document!');
    return null;
  }
};

export const addOrder = async (order) => {
  const orderRef = doc(collection(db, 'shop'));
  await setDoc(orderRef, order);
};

const generateClassSchedule = (className, startTime, endTime, daysOfWeek, weeks = 4) => {
  let classDates = [];
  for (let i = 0; i < weeks; i++) {
    daysOfWeek.forEach(day => {
      const classDate = moment().day(day).add(i, 'weeks');
      classDates.push({
        lessonName: className,
        date: classDate.format('YYYY-MM-DD'),
        time: `${startTime} - ${endTime}`,
        spotsAvailable: 15
      });
    });
  }
  return classDates;
};

const generatepersonaltrainSchedule = (className, startTime, endTime, daysOfWeek, weeks = 4) => {
  let classDates = [];
  for (let i = 0; i < weeks; i++) {
    daysOfWeek.forEach(day => {
      const classDate = moment().day(day).add(i, 'weeks');
      classDates.push({
        lessonName: className,
        date: classDate.format('YYYY-MM-DD'),
        time: `${startTime} - ${endTime}`,
        spotsAvailable: 1
      });
    });
  }
  return classDates;
};

const generatepersonaltrainwith3Schedule = (className, startTime, endTime, daysOfWeek, weeks = 4) => {
  let classDates = [];
  for (let i = 0; i < weeks; i++) {
    daysOfWeek.forEach(day => {
      const classDate = moment().day(day).add(i, 'weeks');
      classDates.push({
        lessonName: className,
        date: classDate.format('YYYY-MM-DD'),
        time: `${startTime} - ${endTime}`,
        spotsAvailable: 3
      });
    });
  }
  return classDates;
};

export const addRecurringClasses = async () => {
  const lessonsCollection = collection(db, 'lessons');

  const pilatesSchedule = generateClassSchedule('Pilates', '08:00', '09:00', [0, 1, 2, 3, 4]);
  const pilatesEveningSchedule = generateClassSchedule('Pilates', '18:00', '19:00', [0, 1, 2, 3, 4]);
  const pilatesFriday = generateClassSchedule('Pilates', '09:00', '10:00', [5]);

  const zumbaMorningSchedule = generateClassSchedule('Zumba', '09:00', '10:00', [1, 2, 3, 4]);
  const zumbaEveningSchedule = generateClassSchedule('Zumba', '19:00', '20:00', [1, 2, 3, 4]);
  const zumbaFriday = generateClassSchedule('Zumba', '10:00', '11:00', [5]);

  const pilatesEquipmentSchedule = generateClassSchedule('Pilates with Equipment', '20:00', '21:00', [1, 2, 3, 4]);
  const pilatesEquipmentFriday = generateClassSchedule('Pilates with Equipment', '11:00', '12:00', [5]);

  const yogaSchedule = generateClassSchedule('Yoga', '17:00', '18:00', [1, 2, 3, 4]);

  const personaltrainSchedule1 = generatepersonaltrainSchedule('personal train with trainer1', '13:00', '14:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule2 = generatepersonaltrainSchedule('personal train with trainer2', '13:00', '14:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule3 = generatepersonaltrainSchedule('personal train with trainer3', '13:00', '14:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule1later = generatepersonaltrainSchedule('personal train with trainer1', '16:00', '17:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule2later = generatepersonaltrainSchedule('personal train with trainer2', '16:00', '17:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule3later = generatepersonaltrainSchedule('personal train with trainer3', '16:00', '17:00', [0, 1, 2, 3, 4]);

  const personaltrainSchedule1with3 = generatepersonaltrainwith3Schedule('personal train with trainer1', '14:00', '15:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule2with3 = generatepersonaltrainwith3Schedule('personal train with trainer2', '14:00', '15:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule3with3 = generatepersonaltrainwith3Schedule('personal train with trainer3', '14:00', '15:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule1laterwith3 = generatepersonaltrainwith3Schedule('personal train with trainer1', '15:00', '16:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule2laterwith3 = generatepersonaltrainwith3Schedule('personal train with trainer2', '15:00', '16:00', [0, 1, 2, 3, 4]);
  const personaltrainSchedule3laterwith3 = generatepersonaltrainwith3Schedule('personal train with trainer3', '15:00', '16:00', [0, 1, 2, 3, 4]);

  const allClasses = [
    ...pilatesSchedule,
    ...pilatesEveningSchedule,
    ...pilatesFriday,
    ...zumbaMorningSchedule,
    ...zumbaEveningSchedule,
    ...zumbaFriday,
    ...pilatesEquipmentSchedule,
    ...pilatesEquipmentFriday,
    ...yogaSchedule,
    ...personaltrainSchedule1,
    ...personaltrainSchedule2,
    ...personaltrainSchedule3,
    ...personaltrainSchedule1later,
    ...personaltrainSchedule2later,
    ...personaltrainSchedule3later,
    ...personaltrainSchedule1with3,
    ...personaltrainSchedule2with3,
    ...personaltrainSchedule3with3,
    ...personaltrainSchedule1laterwith3,
    ...personaltrainSchedule2laterwith3,
    ...personaltrainSchedule3laterwith3,
  ];

  for (const classData of allClasses) {
    const classRef = doc(lessonsCollection);
    await setDoc(classRef, classData);
  }
  console.log("Classes added successfully!");
};

export const fetchLessons = async () => {
  const lessonsCollection = collection(db, 'lessons');
  const lessonsSnapshot = await getDocs(lessonsCollection);
  return lessonsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const addLesson = async (lessonData) => {
  const lessonsCollection = collection(db, 'lessons');
  const lessonRef = doc(lessonsCollection); 
  return setDoc(lessonRef, lessonData);
};

export const editLesson = async (lessonId, updatedData) => {
  const lessonRef = doc(db, 'lessons', lessonId);
  return updateDoc(lessonRef, updatedData);
};

export const deleteLesson = async (lessonId) => {
  const lessonRef = doc(db, 'lessons', lessonId);
  return deleteDoc(lessonRef);
};