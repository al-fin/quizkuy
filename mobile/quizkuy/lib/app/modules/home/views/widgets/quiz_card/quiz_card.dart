import 'package:dotted_line/dotted_line.dart';
import 'package:flutter/material.dart';
import 'package:quizkuy/app/constants/enums/enums.dart';
import 'package:quizkuy/app/global_widgets/white_tooltip/white_tooltip.widget.dart';
import 'package:quizkuy/app/theme/colors.dart';
import 'package:quizkuy/app/theme/text_style.dart';

class QuizCard extends StatelessWidget {
  const QuizCard({
    Key key,
    @required this.status,
    @required this.title,
    @required this.contents,
    @required this.code,
    this.nilai,
    this.rank,
    this.tampilkanNilai,
    this.onDetailTap,
  }) : super(key: key);

  final QuizStatus status;
  final String title;
  final List<String> contents;
  final String code;
  final int nilai;
  final int rank;
  final bool tampilkanNilai;
  final Function onDetailTap;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(bottom: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            blurRadius: 6,
            offset: Offset(0, 6),
            color: Colors.black.withOpacity(0.15),
          )
        ],
      ),
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(10),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildIcon(),
                SizedBox(
                  width: 10,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 240,
                      child: Text(
                        title,
                        style: ThemeTextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                          color: ThemeColors.PRIMARY,
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 5,
                    ),
                    SizedBox(
                      width: 240,
                      child: DottedLine(
                        direction: Axis.horizontal,
                        lineLength: double.infinity,
                        dashColor: Colors.grey[300],
                        dashGapColor: Colors.transparent,
                        dashLength: 6.0,
                        dashRadius: 4.0,
                        dashGapLength: 6.0,
                        dashGapRadius: 0.0,
                        lineThickness: 2.0,
                      ),
                    ),
                    SizedBox(
                      height: 5,
                    ),
                    for (var content in contents)
                      Text(
                        content,
                        style: ThemeTextStyle(
                          fontSize: 12,
                          color: Colors.grey[500],
                        ),
                      ),
                    Container(
                      margin: EdgeInsets.only(top: 10),
                      padding: EdgeInsets.fromLTRB(8, 4, 8, 4),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        color: Colors.grey[300],
                      ),
                      child: Text(
                        code,
                        style: ThemeTextStyle(
                          color: Colors.grey[500],
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          if (status == QuizStatus.BELUM_DIKERJAKAN)
            ClipRRect(
              borderRadius: BorderRadius.vertical(
                bottom: Radius.circular(10),
              ),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.orange[100],
                ),
                child: Material(
                  color: Colors.transparent,
                  child: InkWell(
                    splashColor: Colors.orange.withOpacity(0.2),
                    onTap: onDetailTap,
                    child: Container(
                      padding: EdgeInsets.fromLTRB(20, 5, 20, 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Text(
                            'Lihat Detail',
                            style: ThemeTextStyle(
                              fontSize: 16,
                              color: Colors.orange,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          SizedBox(
                            width: 3,
                          ),
                          Icon(
                            Icons.arrow_forward,
                            color: Colors.orange,
                            size: 24,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          if (status == QuizStatus.SUDAH_DIKERJAKAN && tampilkanNilai)
            Container(
              padding: EdgeInsets.fromLTRB(20, 5, 20, 5),
              decoration: BoxDecoration(
                color: Colors.green[100],
                borderRadius: BorderRadius.vertical(
                  bottom: Radius.circular(10),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Nilai : $nilai',
                    style: ThemeTextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: 18,
                      color: Colors.green[400],
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.emoji_events_outlined,
                        color: Colors.green,
                        size: 16,
                      ),
                      SizedBox(
                        width: 3,
                      ),
                      Text(
                        'Rank $rank',
                        style: ThemeTextStyle(
                          fontSize: 16,
                          color: Colors.green,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  WhiteTooltip _buildIcon() {
    return WhiteTooltip(
      message: status == QuizStatus.BELUM_DIMULAI
          ? 'Belum dimulai'
          : status == QuizStatus.BELUM_DIKERJAKAN
              ? 'Belum dikerjakan'
              : status == QuizStatus.SUDAH_DIKERJAKAN
                  ? 'Sudah dikerjakan'
                  : null,
      child: ClipOval(
        child: Container(
          color: status == QuizStatus.BELUM_DIMULAI
              ? Colors.grey[300]
              : status == QuizStatus.BELUM_DIKERJAKAN
                  ? Colors.orange[100]
                  : status == QuizStatus.SUDAH_DIKERJAKAN
                      ? Colors.green[100]
                      : Colors.grey[300],
          padding: EdgeInsets.all(10),
          child: Icon(
            status == QuizStatus.BELUM_DIMULAI
                ? Icons.alarm_off
                : status == QuizStatus.BELUM_DIKERJAKAN
                    ? Icons.help_outline
                    : status == QuizStatus.SUDAH_DIKERJAKAN
                        ? Icons.check_circle_outline
                        : Icons.circle,
            color: status == QuizStatus.BELUM_DIMULAI
                ? Colors.grey[500]
                : status == QuizStatus.BELUM_DIKERJAKAN
                    ? Colors.orange[500]
                    : status == QuizStatus.SUDAH_DIKERJAKAN
                        ? Colors.green[500]
                        : Colors.grey[500],
            size: 28,
          ),
        ),
      ),
    );
  }
}
