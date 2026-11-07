// هيكلة بيانات الطالب (Class & Constructor)
class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades; 
        this.attendance = attendance; 
    }

    calculateAverage() {
        const total = this.grades.reduce((sum, grade) => sum + grade, 0);
        return total / this.grades.length;
    }

    getGradeLetter() {
        const avg = this.calculateAverage();
        if (avg >= 90) return 'A';
        if (avg >= 80) return 'B';
        if (avg >= 70) return 'C';
        if (avg >= 60) return 'D';
        if (avg >= 50) return 'E';
        return 'F';
    }

    getFinalResult() {
        const avg = this.calculateAverage();
        if (avg >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// نظام تشغيل الجامعة (Objects Array)
const studentsList = [
    new Student(101, "أحمد غانم", [85, 90, 95], 88),      
    new Student(102, "سارة محمد", [42, 45, 48], 80),     
    new Student(103, "يوسف علي", [40, 43, 46], 76),      
    new Student(104, "مريم حسن", [60, 65, 70], 70)       
];

// لجنة الرأفة (Array Methods)
const strugglingStudents = studentsList.filter(student => {
    const avg = student.calculateAverage();
    return avg >= 40 && avg <= 49;
});

const upgradedAverages = strugglingStudents.map(student => {
    return student.calculateAverage() + 5;
});

const totalUpgradedAverages = upgradedAverages.reduce((sum, avg) => sum + avg, 0);
const strugglingCount = upgradedAverages.length;
const finalStrugglingAverage = strugglingCount > 0 ? (totalUpgradedAverages / strugglingCount) : 0;

// حقن البيانات في واجهة المستخدم (DOM Injection)
document.getElementById('total-students-count').innerText = studentsList.length;
document.getElementById('struggling-students-count').innerText = strugglingCount;
document.getElementById('final-struggling-avg').innerText = finalStrugglingAverage.toFixed(2);

const mainTableBody = document.getElementById('main-students-table');
studentsList.forEach(student => {
    const avg = student.calculateAverage().toFixed(2);
    const result = student.getFinalResult();
    const badgeClass = result === "ناجح" ? "badge-success" : "badge-danger";
    
    const row = `<tr>
        <td><b>${student.id}</b></td>
        <td>${student.name}</td>
        <td>${avg}</td>
        <td><span class="badge" style="background-color: #f1f5f9; color: var(--primary); font-size:14px;">${student.getGradeLetter()}</span></td>
        <td>${student.attendance}%</td>
        <td><span class="badge ${badgeClass}">${result}</span></td>
    </tr>`;
    mainTableBody.innerHTML += row;
});

const strugglingContainer = document.getElementById('struggling-students-container');
if (strugglingStudents.length > 0) {
    let itemsHtml = '<div class="struggling-list">';
    strugglingStudents.forEach((student, index) => {
        itemsHtml += `<div class="struggling-item">
            <div class="struggling-info">
                <h4>${student.name}</h4>
                <p>المعدل الأولي قبل الدعم: ${student.calculateAverage().toFixed(2)}</p>
            </div>
            <div class="upgraded-avg">المعدل المطور: ${upgradedAverages[index].toFixed(2)}</div>
        </div>`;
    });
    itemsHtml += '</div>';
    strugglingContainer.innerHTML = itemsHtml;
} else {
    strugglingContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin: 20px 0;">لا يوجد طلاب متعثرين.</p>';
}

// طباعة المخرجات في الكونسول أيضاً لضمان مطابقة شروط التكليف الأصلية
console.log("================= تقرير الطلاب في المصفوفة الرئيسية =================");
studentsList.forEach(student => {
    console.log(`الاسم: ${student.name} | المتوسط: ${student.calculateAverage().toFixed(2)} | التقدير: ${student.getGradeLetter()} | النتيجة: ${student.getFinalResult()}`);
});